import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

export default function NavFooter({ navigation }) {
  return (
    <View style={styles.footer}>
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/img/song_tab_nav.png')} style={styles.navIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('SavedSongs')}
        >
          <Image source={require('../assets/img/saved_songs_nav.png')} style={styles.navIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Image source={require('../assets/img/achievements_nav.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'black',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 70,
    height: 70,
  },
};





