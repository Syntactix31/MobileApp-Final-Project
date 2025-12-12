import React, { useState } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import MainLayout from '../layouts/MainLayout.jsx';
import { useColorScheme } from 'react-native';


export default function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';


  return(

    <MainLayout>
      <Button
          title="Saved Songs"
          
          onPress={() => navigation.navigate('SavedSongs')}
      />    

    </MainLayout>



    
  );
}


