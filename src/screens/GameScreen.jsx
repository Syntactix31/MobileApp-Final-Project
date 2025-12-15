/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';

import Sound from 'react-native-sound';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const TILE_HEIGHT = 160;
const HEADER_HEIGHT = 100;
const FOOTER_HEIGHT = 120;
const GAME_AREA_HEIGHT = WINDOW_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 40;
const SCREEN_HEIGHT = GAME_AREA_HEIGHT;
const COLS = 4;
const ROWS_ON_SCREEN = Math.ceil(SCREEN_HEIGHT / TILE_HEIGHT) + 2;
const INITIAL_SPEED = 8;
const SPEED_RAMP_START_TIME = 5;
const MAX_SPEED = 20; 

// same key used in AchievementsScreen
const STATS_KEY = 'rhythmTilesStats';

export default function GameScreen({ navigation, bgSound, setIsMusicPlaying, route }) {
  const [rows, setRows] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [flash, setFlash] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const speedRef = useRef(INITIAL_SPEED);
  const gameLoop = useRef(null);
  const timerLoop = useRef(null);
  const nextRowId = useRef(0);

  // keep latest score/time for saving
  const scoreRef = useRef(0);
  const timeRef = useRef(0);
  const [gameMusic, setGameMusic] = useState(null);

  const selectedSongId = route?.params?.selectedSongId || '2';

  const getSongFileName = (songId) => {
    const songFiles = {
      '1': 'song1.wav',
      '2': 'song2.wav',
      '3': 'song3.wav',
      '4': 'song4.wav',
      '5': 'song5.mp3',
      '6': 'song6.wav',
      '7': 'song7.wav',
      '8': 'song8.mp3',
      '9': 'song9.wav',
      '10': 'song10.wav',
    };
    return songFiles[songId] || 'song2.wav';
  };

  // ---------------- ROW CREATION ----------------

  const createRow = (y, id) => ({
    id,
    y,
    black: Math.floor(Math.random() * COLS),
    hit: false,
  });

  const initRows = () => {
    const startRows = [];
    for (let i = 0; i < ROWS_ON_SCREEN; i++) {
      const y = SCREEN_HEIGHT - TILE_HEIGHT - i * TILE_HEIGHT;
      startRows.push(createRow(y, i));
    }
    nextRowId.current = ROWS_ON_SCREEN;
    return startRows;
  };

  const startGame = () => {
    if (gameStarted) return;
    setGameStarted(true);

    if (gameMusic && gameMusic.isLoaded()) {
      gameMusic.play((success) => {
        if (!success) console.log('Game music playback failed');
      });

      gameMusic.setNumberOfLoops(0); 
      const checkMusicEnd = setInterval(() => {
          if (gameMusic && gameMusic.isLoaded() && !gameMusic.isPlaying()) {
            clearInterval(checkMusicEnd);
            endGame();
          }
        }, 100);
    }

    gameLoop.current = setInterval(moveRows, 16);

    timerLoop.current = setInterval(() => {
      setTime((t) => {
        const updated = t + 1;
        timeRef.current = updated;
        return updated;
      });
    }, 1000);
  };

  const initGame = () => {
    if (gameMusic && gameMusic.isLoaded()) {
      gameMusic.stop();
    }
    const initialRows = initRows();
    setRows(initialRows);
    setScore(0);
    setTime(0);
    scoreRef.current = 0;
    timeRef.current = 0;
    setGameOver(false);
    setGameStarted(false);
    speedRef.current = INITIAL_SPEED;

    clearInterval(gameLoop.current);
    clearInterval(timerLoop.current);
  };

  // ---------------- STATS SYNC ----------------

  const updateStatsOnGameOver = async (finalScore, finalTime) => {
    try {
      const json = await AsyncStorage.getItem(STATS_KEY);
      const prev = json
        ? JSON.parse(json)
        : {
            totalGamesPlayed: 0,
            bestScore: 0,
            bestTimeSurvived: 0,
            totalTilesHit: 0,
          };

      const newStats = {
        totalGamesPlayed: prev.totalGamesPlayed + 1,
        bestScore: Math.max(prev.bestScore, finalScore),
        bestTimeSurvived: Math.max(prev.bestTimeSurvived, finalTime),
        totalTilesHit: prev.totalTilesHit + finalScore,
      };

      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(newStats));
      console.log('Stats updated:', newStats);
    } catch (error) {
      console.log('Error updating stats', error);
    }
  };

  // ---------------- ROW MOVEMENT ----------------

  const moveRows = () => {
    setRows((prev) => {
      const newRows = [];
      let missedBlack = false;

      for (let i = 0; i < prev.length; i++) {
        let row = { ...prev[i] };
        const newY = row.y + speedRef.current;

        // missed black tile at bottom
        if (newY >= SCREEN_HEIGHT && !row.hit && row.black !== undefined) {
          missedBlack = true;
        }

        if (newY >= SCREEN_HEIGHT) {
          // recycle row to the top
          let highestY = Infinity;
          for (let j = 0; j < newRows.length; j++) {
            if (newRows[j].y < highestY) highestY = newRows[j].y;
          }
          for (let j = i + 1; j < prev.length; j++) {
            if (prev[j].y < highestY) highestY = prev[j].y;
          }

          const newYPosition = highestY - TILE_HEIGHT;
          row = createRow(newYPosition, nextRowId.current++);
        } else {
          row.y = newY;
        }
        newRows.push(row);
      }

      newRows.sort((a, b) => a.y - b.y);

      if (missedBlack) {
        setTimeout(() => endGame(), 0);
      }

      return newRows;
    });
  };

  // ---------------- INPUT HANDLING ----------------

  const onTilePress = (rowId, col) => {
    if (gameOver) return;

    if (!gameStarted) {
      startGame();
    }

    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;

        // correct black tile
        if (row.black === col && !row.hit) {
          setScore((s) => {
            const updated = s + 1;
            scoreRef.current = updated;
            return updated;
          });
          // speedRef.current += 0.1;
          return { ...row, hit: true };
        }

        // wrong tile
        setFlash({ rowId, col });
        setTimeout(() => setFlash(null), 200);
        setTimeout(() => endGame(), 200);

        return row;
      }),
    );
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const updateSpeed = () => {
      if (timeRef.current >= SPEED_RAMP_START_TIME) {
        // Gradually increase speed after ramp start time
        const timeElapsed = timeRef.current - SPEED_RAMP_START_TIME;
        speedRef.current = Math.min(
          INITIAL_SPEED + (timeElapsed * 0.15), // Increase 0.15 per second
          MAX_SPEED
        );
      } else {
        // Keep initial speed until ramp time
        speedRef.current = INITIAL_SPEED;
      }
    };
      const interval = setInterval(updateSpeed, 1000);
      
      return () => clearInterval(interval);
  }, [gameStarted, gameOver, time]);



  // ---------------- GAME END ----------------

  const endGame = () => {
    if (gameOver) return;
    
    if (gameMusic && gameMusic.isLoaded()) {
      gameMusic.stop();
    }

    setGameOver(true);
    clearInterval(gameLoop.current);
    clearInterval(timerLoop.current);

    // use refs so we always save latest values
    updateStatsOnGameOver(scoreRef.current, timeRef.current);
  };

  // ---------------- LIFECYCLE ----------------

  useEffect(() => {
    initGame();
    return () => {
      clearInterval(gameLoop.current);
      clearInterval(timerLoop.current);
    };
  }, []);

  useEffect(() => {
    Sound.setCategory('Playback');
    const songFile = getSongFileName(selectedSongId);
    const sound = new Sound(songFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Game music failed to load:', error);
        return;
      }
      setGameMusic(sound);
    });

    return () => {
      if (sound?.isLoaded()) {
        sound.stop();
        sound.release();
      }
    };
  }, [selectedSongId]);

  console.log('Selected song ID:', selectedSongId, 'File:', getSongFileName(selectedSongId));



  const handleProfilePress = () => {
    console.log('Profile pressed');
    navigation.navigate('Profile');
  };

  useFocusEffect(
    useCallback(() => {
      if (bgSound) {
        bgSound.pause();
        setIsMusicPlaying(false);
      }

      return () => {
        if (bgSound) {
          bgSound.setCurrentTime(0);

          bgSound.play((success) => {
            if (success) {
              setIsMusicPlaying(true);
            }
          });
        }
      };
    }, [bgSound, setIsMusicPlaying]),
  );

  // ---------------- RENDER ----------------

  return (
    <MainLayout>
      <Header title="Rhythm Tiles" onProfilePress={handleProfilePress} />

      <View style={styles.wrapper}>
        <Text style={styles.ui}>Score: {score}</Text>
        <Text style={[styles.ui, { top: 35 }]}>Time: {time}s</Text>

        <View style={styles.verticalLines}>
          <View style={[styles.verticalLine, { left: '25%' }]} />
          <View style={[styles.verticalLine, { left: '50%' }]} />
          <View style={[styles.verticalLine, { left: '75%' }]} />
        </View>

        {rows.map((row) => {
          const isVisible = row.y > -TILE_HEIGHT && row.y < SCREEN_HEIGHT;
          if (!isVisible) return null;

          return (
            <View
              key={row.id}
              style={[
                styles.row,
                {
                  top: row.y,
                  height: TILE_HEIGHT,
                },
              ]}
            >
              {[...Array(COLS)].map((_, col) => {
                const isBlack = row.black === col && !row.hit;
                const isFlash = flash?.rowId === row.id && flash?.col === col;

                return (
                  <Pressable
                    key={col}
                    onPress={() => onTilePress(row.id, col)}
                    style={[
                      styles.tile,
                      {
                        backgroundColor: isFlash
                          ? 'red'
                          : isBlack
                          ? '#000'
                          : '#fff',
                        height: TILE_HEIGHT,
                      },
                    ]}
                  />
                );
              })}
            </View>
          );
        })}

        {gameOver && (
          <View style={styles.overlay}>
            <Text style={styles.gameOver}>Game Over</Text>
            <Text style={styles.final}>Score: {score}</Text>
            <Text style={styles.final}>Time: {time}s</Text>

            <Pressable style={styles.restart} onPress={initGame}>
              <Text style={styles.restartText}>Restart</Text>
            </Pressable>
          </View>
        )}
      </View>

      <NavFooter navigation={navigation} />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
  },

  row: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
  },

  tile: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 0,
  },

  verticalLines: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
    zIndex: 5,
  },

  verticalLine: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
    zIndex: 5,
  },

  ui: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontWeight: 'bold',
    zIndex: 10,
    color: '#00ffff',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  gameOver: {
    fontSize: 36,
    color: '#00ffff',
    fontWeight: 'bold',
  },

  final: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
  },

  restart: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },

  restartText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
});
