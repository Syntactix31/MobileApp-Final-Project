/* eslint-disable react-native/no-inline-styles */
// screens/HomeScreen.jsx
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';

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

export default function HomeScreen({ navigation, songsData, savedSongs, toggleSave, likedSongs, toggleLike, setHomeLoaded  }) {

  useEffect(() => {
    setHomeLoaded?.(true);
    
    return () => setHomeLoaded?.(false);
  }, [setHomeLoaded]);

  const handleProfilePress = () => {
    console.log('Profile pressed');
    navigation.navigate('Profile');

  };

  const playSong = () => {
    navigation.navigate('GameScreen');
  };

  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Header 
          title="Rhythm Tiles" 
          onProfilePress={handleProfilePress}
        />

        <FlatList
          data={songsData}
          renderItem={({ item }) => (
            <SongItem
              song={item}
              isLiked={likedSongs.some((s) => s.id === item.id)}
              isSaved={savedSongs.some((s) => s.id === item.id)}
              onLike={() => toggleLike(item)}
              onSave={() => toggleSave(item)}
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
