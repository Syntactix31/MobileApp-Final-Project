/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';

import WelcomeScreen from './screens/WelcomeScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import SavedSongsScreen from './screens/SavedSongsScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AchievementsScreen from './screens/AchievementsScreen.jsx';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { AppState } from 'react-native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');


const Stack = createNativeStackNavigator();

const songsData = [
  { id: '1', title: 'Smooth Moves', credits: 'LNDO' },
  { id: '2', title: 'Ephemeral Colours', credits: 'Moments' },
  { id: '3', title: 'Soft Return', credits: 'Moments' },
  { id: '4', title: 'Just a Dream', credits: 'CJ-0' },
  { id: '5', title: 'Jovial Walk', credits: 'Elbroar' },
  { id: '6', title: 'The Last Prelude', credits: 'Moments' },
  { id: '7', title: 'Viva la Mamma', credits: 'Elbroar' },
  { id: '8', title: 'Starlit Galaxy', credits: 'Chronos' },
  { id: '9', title: 'Love Again', credits: 'Liberty' },
  { id: '10', title: 'Skin Symphony ', credits: 'Andrewball' },
];


export default function App() {
  const [savedSongs, setSavedSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  const [bgSound, setBgSound] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [homeLoaded, setHomeLoaded] = useState(false); 

  
  useEffect(() => {
    let sound = null;
    
    Sound.setCategory('Playback');
    sound = new Sound('background2.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load background sound', error);
        return;
      }
      setBgSound(sound);
      sound.setNumberOfLoops(-1);

      // Audio wait fro homescreen
      // sound.play((success) => {
      //   if (success) setIsMusicPlaying(false);
      // });
    });

    return () => {
      if (sound?.isLoaded()) {
        sound.stop();
        sound.release();
      }
      setBgSound(null);

      // setIsMusicPlaying(false);
    };
  }, []);

  useEffect(() => {
    if (homeLoaded && bgSound && !isMusicPlaying) {
      bgSound.play((success) => {
        if (success) setIsMusicPlaying(true);
      });
    }
  }, [homeLoaded, bgSound, isMusicPlaying]);


  const toggleSave = (song) => {
    setSavedSongs((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };
  
  const toggleLike = (song) => {
    setLikedSongs((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'none',}}>
        <Stack.Screen name="Welcome" options={{ 
              animation: 'fade',
              animationDuration: 1100 
            }}>
          {(props) => (
            <WelcomeScreen
              {...props}
              
            />
          )}
        </Stack.Screen>        

        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              songsData={songsData}
              savedSongs={savedSongs}
              toggleSave={toggleSave}
              likedSongs={likedSongs}
              toggleLike={toggleLike}
              setHomeLoaded={setHomeLoaded}
              
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SavedSongs">
          {(props) => (
            <SavedSongsScreen
              {...props}
              savedSongs={savedSongs}
              toggleSave={toggleSave}
              likedSongs={likedSongs}
              toggleLike={toggleLike} 
              allSongs={songsData} 
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="GameScreen">
          {(props) => (
            <GameScreen 
              {...props} 
              bgSound={bgSound}
              isMusicPlaying={isMusicPlaying}
              setIsMusicPlaying={setIsMusicPlaying}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}







// ********* NOTE: FIX ESLINT NO INLINE STYLING IN CONFIG FILE TO DISABLED **************\\


