/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';

import MainLayout from '../layouts/MainLayout';
import NavFooter from '../layouts/NavFooter';

export default function ProfileScreen({ navigation }) {

  // Move profile to middle of header and remove title




  





  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Text>
          Profile Stuff
        </Text>


        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>

  );
}


