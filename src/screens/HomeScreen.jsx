/* eslint-disable react-native/no-inline-styles */
// screens/HomeScreen.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';

import SongItem from '../components/SongItem';

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
});

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

export default function HomeScreen({ navigation }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);

  const handleProfilePress = () => {
    console.log('Profile pressed');
    navigation.navigate('Profile');

  };

  const toggleLike = (songId) => {
    setLikedSongs(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const toggleSave = (songId) => {
    setSavedSongs(prev => 
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const playSong = () => {
    navigation.navigate('Game'); // Jiro to replace with gamescreen
  };

  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Header 
          title="Piano Tiles" 
          onProfilePress={handleProfilePress}
        />

        <FlatList
          data={songsData}
          renderItem={({ item }) => (
            <SongItem
              song={item}
              isLiked={likedSongs.includes(item.id)}
              isSaved={savedSongs.includes(item.id)}
              onLike={() => toggleLike(item.id)}
              onSave={() => toggleSave(item.id)}
              onPress={playSong}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>
  );
}

// const styles = {
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   profileIcon: {
//     width: 50,
//     height: 50,
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 140,
//   },
// };
