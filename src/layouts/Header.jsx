import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { neonBlueText, headerTitle, header } from '../layouts/MainLayout';

export default function Header({ title, onProfilePress }) {
  return (
    <View style={[header, styles.container]}>
      <Text style={[neonBlueText, headerTitle, styles.title]}>{title}</Text>
      <TouchableOpacity onPress={onProfilePress}>
        <Image 
          source={require('../assets/img/user.png')} 
          style={styles.profileIcon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  profileIcon: {
    width: 50,
    height: 50,
  },
});


