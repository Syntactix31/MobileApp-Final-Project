/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';
import SongItem from '../components/SongItem';

const styles = StyleSheet.create({
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#00ffff',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    marginHorizontal: 5,
    marginTop: 10,
  },
  
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },  
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
  contentContainer: {
    flex: 1,
  },

  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 40,
    fontSize: 16,
  },

  // title: {
  //   textAlign: 'center',
  //   color: 'gray',
  //   marginTop: 20,
  //   fontSize: 16,
  // },
  
});

export default function SavedSongsScreen({ navigation, savedSongs, toggleSave, likedSongs, toggleLike, allSongs }) {
  const handleProfilePress = () => navigation.navigate('Profile');

  const uniqueSongIds = new Set([...likedSongs.map(s => s.id), ...savedSongs.map(s => s.id)]);
  const combinedSongs = Array.from(uniqueSongIds).map(id => {
    const song = allSongs.find(s => s.id === id);
    return {
      ...song,
      isLiked: likedSongs.some(s => s.id === id),
      isSaved: savedSongs.some(s => s.id === id),
    };
  });

  const combinedData = [
    ...(likedSongs.length > 0 ? [{ type: 'header', title: 'Liked Songs' }] : []),
    ...combinedSongs.filter(song => song.isLiked).map(song => ({ ...song, type: 'liked' })),
    ...(savedSongs.length > 0 ? [{ type: 'header', title: 'Playlist #1' }] : []),
    ...combinedSongs.filter(song => song.isSaved).map(song => ({ ...song, type: 'saved' })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      const isPlaylistHeader = item.title === 'Playlist #1';
      const hasLikedSongsAbove = likedSongs.length > 0;
      
      return <Text style={[styles.sectionTitle, isPlaylistHeader && hasLikedSongsAbove && { marginTop: 15}]}>
        {item.title}
      </Text>;
    }

    return (
      <SongItem
        song={item}
        isLiked={item.isLiked || item.type === 'liked'}
        isSaved={item.isSaved || item.type === 'saved'}
        onLike={() => toggleLike(item)}
        onSave={() => toggleSave(item)}
        onPress={() => navigation.navigate('GameScreen')}
      />
    );
  };

  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Header title="Saved Songs" onProfilePress={handleProfilePress} />

        {combinedData.length === 0 ? (
          <Text style={styles.emptyText}>No liked or saved songs yet.</Text>
        ) : (
          <FlatList
            data={combinedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              if (item.type === 'header') 
                return `header-${item.title}-${index}`;
              return `${item.type}-${item.id}`;
            }}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>
  );
}


