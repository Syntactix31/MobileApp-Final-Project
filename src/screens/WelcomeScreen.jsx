/* eslint-disable react-native/no-inline-styles */
// screens/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Sound from 'react-native-sound';
import MainLayout, { layoutStyles } from '../layouts/MainLayout';


export default function WelcomeScreen({ navigation }) {

  const [welcomeSound, setWelcomeSound] = useState(null);

  const [startButtonSound, setStartButtonSound] = useState(null);

  const [isPianoActive, setIsPianoActive] = useState(false);



  useEffect(() => {
    Sound.setCategory('Playback');
    const sound = new Sound('background1.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Welcome sound failed:', error);
        return;
      }
      sound.setNumberOfLoops(-1);
      sound.play();
      setWelcomeSound(sound);
    });

    return () => {
      if (sound?.isLoaded()) {
        sound.stop();
        sound.release();
      }
    };
  }, []);

  useEffect(() => {
    const sound = new Sound('gamestart.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Start sound failed:', error);
        return;
      }
      sound.setNumberOfLoops(0);
      setStartButtonSound(sound);
    });

    return () => {
      if (sound?.isLoaded()) {
        sound.stop();
        sound.release();
      }
    };
  }, []);



  const handleStartPress = () => {
    if (welcomeSound) {

      if (startButtonSound && startButtonSound.isLoaded()) {
        startButtonSound.play((success) => {
          if (!success) {
            console.log('Start sound playback failed');
          }
        });
      }


      welcomeSound.stop();
      welcomeSound.release();

      setWelcomeSound(null);
    }

    console.log('Start pressed - Welcome audio stopped');
    navigation.navigate('Home');

  };

  const handlePianoPress = () => {
    setIsPianoActive(!isPianoActive);
  };


  return (
    <MainLayout>
      <View style={[layoutStyles.header, layoutStyles.neonBlueBox, styles.container, { flex: 1 }]}>

        <View style={styles.curvedBorder} />

        
        <View style={styles.titleContainer}>
          <Text 
          style={[layoutStyles.neonBlueText, layoutStyles.headerTitle, styles.title]}>
            Rhythm Tiles
          </Text>        
        </View>
      </View>

        <TouchableOpacity onPress={handlePianoPress}>
          <Image 
            source={isPianoActive 
              ? require('../assets/img/neonpiano.jpg') 
              : require('../assets/img/neonpiano2.jpg')} 
            style={styles.pianoImage} 
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleStartPress} style={styles.startContainer}>
          <Text style={styles.start}>
            Start            
          </Text>

        </TouchableOpacity>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 250,
    marginBottom: 70,
    marginHorizontal: 'auto',
    width: 300,
    height: 300,

    // These styles will change how the header looks I think the side ones look the best
    borderLeftWidth: 2,
    // borderWidth: 2,
    borderTopWidth: 2,

    borderRightWidth: 2,
    // borderBottomWidth: 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: '#00ffff', 
    backgroundColor: 'transparent',
  },

  startContainer: {
    textAlign: 'center',
    marginHorizontal: 'auto',
    borderColor: '#00ffff',
    borderWidth: 4,
    padding: 10,
    borderRadius: 90,
    width: 150,
    marginBottom: 80,
  },
  start: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 'auto',
    
  },


  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    },

  title: {
    fontSize: 36,
  },

  pianoImage: {
    width: 200,
    height: 200,
    marginHorizontal: 'auto',
    marginTop: 20,
    marginBottom: 150,
    padding: 10,

  },

});








