/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen.jsx';
import SavedSongsScreen from './screens/SavedSongsScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AchievementsScreen from './screens/AchievementsScreen.jsx';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const songsData = [
  { id: '1', title: 'Song #1', credits: 'Credits' },
  { id: '2', title: 'Song #2', credits: 'Credits' },
  { id: '3', title: 'Song #3', credits: 'Credits' },
  { id: '4', title: 'Song #4', credits: 'Credits' },
  { id: '5', title: 'Song #5', credits: 'Credits' },
  { id: '6', title: 'Song #6', credits: 'Credits' },
  { id: '7', title: 'Song #7', credits: 'Credits' },
  { id: '8', title: 'Song #8', credits: 'Credits' },
  { id: '9', title: 'Song #9', credits: 'Credits' },
  { id: '10', title: 'Song #10', credits: 'Credits' },
];

export default function App() {
  const [savedSongs, setSavedSongs] = useState([]);

  const toggleSave = (song) => {
    setSavedSongs((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'none',}}>

        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              songsData={songsData}
              savedSongs={savedSongs}
              toggleSave={toggleSave}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SavedSongs">
          {(props) => (
            <SavedSongsScreen
              {...props}
              savedSongs={savedSongs}
              toggleSave={toggleSave}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}







// ********* NOTE: FIX ESLINT NO INLINE STYLING IN CONFIG FILE TO DISABLED **************\\


