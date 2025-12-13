/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';


export default function SavedSongsScreen({ navigation }) {
  const currentDate = new Date().toLocaleDateString();

  const handleProfilePress = () => {
    console.log('Profile pressed');
    navigation.navigate('Profile');

  };



  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Header 
          title="Rhythm Tiles" 
          onProfilePress={handleProfilePress}
        />

        <Text style={styles.title}>Rhythm Tiles</Text>
        <Text style={styles.text}>Developers: Levi M, Theo S, Jiro R, Justice M</Text>
        <Text style={styles.text}>Date: {currentDate}</Text>


        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 10, },
});

