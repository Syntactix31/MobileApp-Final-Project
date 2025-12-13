import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { layoutStyles } from '../layouts/MainLayout';

export default function Header({ title, onProfilePress }) {
  return (
    <View style={[layoutStyles.header, layoutStyles.neonBlueBox, layoutStyles.zIndexHigh, styles.container]}>

      <View style={styles.curvedBorder} />

      
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
    marginTop: 45,
    marginBottom: 10,

    // These styles will change how the header looks I think the side ones look the best
    borderLeftWidth: 2,
    // borderWidth: 2, (for all sides)
    // borderTopWidth: 2,

    borderRightWidth: 2,
    // borderBottomWidth: 2,
    borderBottomLeftRadius: 30,
    borderColor: '#00ffff', 
    backgroundColor: 'transparent',



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


