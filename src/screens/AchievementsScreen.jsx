/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';

import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';

export default function AchievementsScreen({ navigation }) {

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


        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>

  );
}
