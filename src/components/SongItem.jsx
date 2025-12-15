import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';


export default function SongItem({ song, isLiked, isSaved, onLike, onSave, onPress }) {
  return (
    <TouchableOpacity style={styles.songContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.artworkContainer}>
        <View style={styles.whiteGlow} /> 
        <Image source={song.imageUrl} style={styles.imagePlaceholder} resizeMode="cover" />
        <View style={styles.cdImagePlaceholder} />
        
      </View>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.credits}>{song.credits}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onLike} style={styles.button}>
          <Image
            source={isLiked 
              ? require('../assets/img/heart-love.png')
              : require('../assets/img/heart-love_2.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onSave} style={[styles.button, styles.saveButton]}>
          <Image
            source={isSaved
              ? require('../assets/img/tab.png')
              : require('../assets/img/tab_2.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
    paddingLeft: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#04D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },

  artworkContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    marginRight: 20,
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    // backgroundColor: 'rgb(37, 36, 41)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
  },

  whiteGlow: {
  width: 88,    
  height: 80,    
  backgroundColor: 'transparent',
  position: 'absolute',
  borderRadius: 44,
  top: -4,      
  left: 8,
  zIndex: 1,    
  shadowColor: '#FFFFFF',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: 15,
  elevation: 20,
},




  //#647d72ff
  //#998c67ff

  cdImagePlaceholder: {
    width: 75,
    height: 75,
    backgroundColor: '#7d7d64ff', 
    borderRadius: 37.5, 
    position: 'absolute',
    top: 2,
    right: -16,
    zIndex: 2,
  },

  songInfo: {
    flex: 1,
    marginLeft: 12,
  },

  songTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },

  credits: {
    color: '#d1d5db',
    fontSize: 14,
  },

  actionButtons: {
    flexDirection: 'column',
    gap: 12,
  },

  button: {
    padding: 4,
  },

  saveButton: {
    marginTop: 4,
  },

  icon: {
    width: 25,
    height: 25,
  },
};









// Previous styling compare to see which is better I like the second



/** 
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';


export default function SongItem({ song, isLiked, isSaved, onLike, onSave, onPress }) {
  return (
    <TouchableOpacity style={styles.songContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.artworkContainer}>
        <View style={styles.cdImagePlaceholder} />
        <View style={styles.imagePlaceholder} />
        
      </View>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.credits}>Credits</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onLike} style={styles.button}>
          <Image
            source={isLiked 
              ? require('../assets/img/heart-love.png')
              : require('../assets/img/heart-love_2.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onSave} style={[styles.button, styles.saveButton]}>
          <Image
            source={isSaved
              ? require('../assets/img/tab.png')
              : require('../assets/img/tab_2.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
    paddingLeft: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#04D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },

  artworkContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    marginRight: 20,
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgb(37, 36, 41)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },

  cdImagePlaceholder: {
    width: 75,
    height: 75,
    backgroundColor: 'rgb(57, 56, 63)',
    borderRadius: 37.5,
    position: 'absolute',
    top: 2,
    right: -16,
    zIndex: 1,
  },

  songInfo: {
    flex: 1,
    marginLeft: 12,
  },

  songTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },

  credits: {
    color: '#d1d5db',
    fontSize: 14,
  },

  actionButtons: {
    flexDirection: 'column',
    gap: 12,
  },

  button: {
    padding: 4,
  },

  saveButton: {
    marginTop: 4,
  },

  icon: {
    width: 25,
    height: 25,
  },
};

*/

