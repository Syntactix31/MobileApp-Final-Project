/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';

import MainLayout from '../layouts/MainLayout';
import NavFooter from '../layouts/NavFooter';

export default function ProfileScreen({ navigation }) {

  // Move profile to middle of header and remove title
  // Also include exit/signout button to welcome screen



  





  return (
    <MainLayout>
      <View style={{ flex: 1 }}>



        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>

  );
}


