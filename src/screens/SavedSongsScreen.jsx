import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MainLayout from '../layouts/MainLayout';



export default function SavedSongsScreen({ navigation }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <MainLayout>
      <View style={styles.content}>
        <Text style={styles.title}>Rhythm Tiles</Text>
        <Text style={styles.text}>Developers: Levi M, Theo S, Jiro R, Justice M</Text>
        <Text style={styles.text}>Date: {currentDate}</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 10 },
});

