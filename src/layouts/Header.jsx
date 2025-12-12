import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function Header({ title = 'Piano Tiles', onProfilePress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onProfilePress}>
        <Image 
          source={require('../assets/img/user.png')} 
          style={styles.profileIcon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
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
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    width: 50,
    height: 50,
  },
};
