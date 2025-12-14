/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const TILE_HEIGHT = 160;
const HEADER_HEIGHT = 100;
const FOOTER_HEIGHT = 120;
const GAME_AREA_HEIGHT = WINDOW_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 40;
const SCREEN_HEIGHT = GAME_AREA_HEIGHT;
const COLS = 4;
const ROWS_ON_SCREEN = Math.ceil(SCREEN_HEIGHT / TILE_HEIGHT) + 2;
const INITIAL_SPEED = 5;

export default function GameScreen({ navigation, bgSound, setIsMusicPlaying }) {
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

  // ROW CREATION
  
  const createRow = (y, id) => ({
    id,
    y,
    black: Math.floor(Math.random() * COLS),
    hit: false,
  });

  const initRows = () => {
    const startRows = [];
    // Create rows starting from the bottom of the screen
    // The first row should be at the bottom had problems with this
    for (let i = 0; i < ROWS_ON_SCREEN; i++) {
      // Position rows so the bottom row is at the bottom of the screen
      const y = SCREEN_HEIGHT - TILE_HEIGHT - (i * TILE_HEIGHT);
      startRows.push(createRow(y, i));
    }
    nextRowId.current = ROWS_ON_SCREEN;
    return startRows;
  };

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      gameLoop.current = setInterval(moveRows, 16);
      timerLoop.current = setInterval(() => setTime(t => t + 1), 1000);
    }
  };

  const initGame = () => {
    const initialRows = initRows();
    setRows(initialRows);
    setScore(0);
    setTime(0);
    setGameOver(false);
    setGameStarted(false);
    speedRef.current = INITIAL_SPEED;

    clearInterval(gameLoop.current);
    clearInterval(timerLoop.current);
  };

  // ROW MOVEMENT

  const moveRows = () => {
    setRows(prev => {
      const newRows = [];
      let missedBlack = false;

      for (let i = 0; i < prev.length; i++) {
        let row = { ...prev[i] };
        const newY = row.y + speedRef.current;

        // Check if black tile is missed when it reaches the bottom
        if (newY >= SCREEN_HEIGHT && !row.hit && row.black !== undefined) {
          missedBlack = true;
        }

        // If row is completely off screen (bottom), recycle it to top
        if (newY >= SCREEN_HEIGHT) {
          // Find the highest row (smallest y value)
          let highestY = Infinity;
          for (let j = 0; j < newRows.length; j++) {
            if (newRows[j].y < highestY) highestY = newRows[j].y;
          }
          for (let j = i + 1; j < prev.length; j++) {
            if (prev[j].y < highestY) highestY = prev[j].y;
          }
          
          // Place new row exactly TILE_HEIGHT above the highest row
          const newYPosition = highestY - TILE_HEIGHT;
          row = createRow(newYPosition, nextRowId.current++);
        } else {
          row.y = newY;
        }
        newRows.push(row);
      }

      // Sort rows by y position
      newRows.sort((a, b) => a.y - b.y);

      if (missedBlack) {
        setTimeout(() => endGame(), 0);
      }

      return newRows;
    });
  };

  // INPUT HANDLING 

  const onTilePress = (rowId, col) => {
    if (gameOver) return;
    
    // Start game on first tile press
    if (!gameStarted) {
      startGame();
    }

    setRows(prev =>
      prev.map(row => {
        if (row.id !== rowId) return row;

        // Correct tile (black and not hit)
        if (row.black === col && !row.hit) {
          setScore(s => s + 1);
          speedRef.current += 0.1;
          return { ...row, hit: true };
        }

        // Wrong tile (not black OR already hit black)
        setFlash({ rowId, col });
        setTimeout(() => setFlash(null), 200);
        setTimeout(() => endGame(), 200);
        
        return row;
      })
    );
  };

  // GAME END

  const endGame = () => {
    if (gameOver) return;
    
    setGameOver(true);
    clearInterval(gameLoop.current);
    clearInterval(timerLoop.current);
  };

  useEffect(() => {
    initGame();
    return () => {
      clearInterval(gameLoop.current);
      clearInterval(timerLoop.current);
    };
  }, []);

  // RENDER 

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
          
          // NOTE: To restart bg music from beginning on re-render
          bgSound.setCurrentTime(0);

          bgSound.play((success) => {
            if (success) {
              setIsMusicPlaying(true);
            }
          });
        }
      };
    }, [bgSound, setIsMusicPlaying])
  );

  return (
    <MainLayout>
      <Header title="Rhythm Tiles" onProfilePress={handleProfilePress}/>

      <View style={styles.wrapper}>
        <Text style={styles.ui}>Score: {score}</Text>
        <Text style={[styles.ui, { top: 35 }]}>Time: {time}s</Text>

        <View style={styles.verticalLines}>
          <View style={[styles.verticalLine, { left: '25%' }]} />
          <View style={[styles.verticalLine, { left: '50%' }]} />
          <View style={[styles.verticalLine, { left: '75%' }]} />
        </View>

        {rows.map(row => {
          // Only render rows that are visible
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
                }
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

/* ---------------- STYLES ---------------- */

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

