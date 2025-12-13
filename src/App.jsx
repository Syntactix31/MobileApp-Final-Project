/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import HomeScreen from './screens/HomeScreen.jsx';
import SavedSongsScreen from './screens/SavedSongsScreen.jsx';
import GameScreen from './screens/GameScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AchievementsScreen from './screens/AchievementsScreen.jsx';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'none',}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SavedSongs" component={SavedSongsScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}







// ********* NOTE: FIX ESLINT NO INLINE STYLING IN CONFIG FILE TO DISABLED **************\\


