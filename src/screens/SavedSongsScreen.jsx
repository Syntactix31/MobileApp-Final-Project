/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';
import SongItem from '../components/SongItem';

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 140,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 40,
    fontSize: 16,
  },
});

export default function SavedSongsScreen({ navigation, savedSongs, toggleSave }) {
  const handleProfilePress = () => navigation.navigate('Profile');

  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Header title="Saved Songs" onProfilePress={handleProfilePress} />

        {savedSongs.length === 0 ? (
          <Text style={styles.emptyText}>No saved songs yet.</Text>
        ) : (
          <FlatList
            data={savedSongs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SongItem
                song={item}
                isSaved={true}
                onSave={() => toggleSave(item)}
                onPress={() => navigation.navigate('GameScreen')}
              />
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}

        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>
  );
}


