import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function MainLayout({ children }) {
  return (
    <SafeAreaView style={styles.body}>
      {/* <View style={styles.header}>
        <Text style={[styles.neonBlueText, styles.headerTitle]}>
          Rhythm Tiles
        </Text>
      </View> */}

      <View style={styles.mainContainer}>

        {children}
        {/* <View style={styles.artworkContainer}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.cdImagePlaceholder} />
        </View>

        <View style={styles.content}>{children}</View> */}
      </View>

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>Footer content</Text>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },

  neonBlueBox: {
    backgroundColor: '#000000',
    shadowColor: '#04D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },

  neonBlueText: {
    color: '#FFFFFF',
    textShadowColor: '#04D9FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    fontWeight: '700',
  },

  zIndexHigh: {
    zIndex: 500,
  },

  header: {
    overflow: 'hidden',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 20,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  header2: {
    overflow: 'hidden',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  mainContainer: {
    flex: 1,
    position: 'relative',
    padding: 0,
  },

  artworkContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgb(37, 36, 41)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  cdImagePlaceholder: {
    width: 75,
    height: 75,
    backgroundColor: 'rgb(57, 56, 63)',
    borderRadius: 90,
    position: 'absolute',
    top: 2,
    right: -16,
  },

  content: {
    marginTop: 16,
    flex: 1,
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000,
  },

  footerText: {
    color: 'white',
    fontWeight: '700',
  },
});


