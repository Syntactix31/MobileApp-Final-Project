import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { layoutStyles } from '../layouts/MainLayout';

export default function Header({ title, onProfilePress }) {
  return (
    <View style={[layoutStyles.header, styles.container]}>
      <View style={styles.titleContainer}>
        <Text 
        style={[layoutStyles.neonBlueText, layoutStyles.headerTitle, styles.title]}>
          {title}
        </Text>        
      </View>


      <TouchableOpacity onPress={onProfilePress} style={styles.profileContainer}>
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
    marginTop: 45,
    marginBottom: 10,
    padding: 10,
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 38,
  },

  title: {
    fontSize: 36,
  },

  profileContainer: {
    // keep this empty

  },

  profileIcon: {
    width: 50,
    height: 50,
  },
});


