/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainLayout from '../layouts/MainLayout';
import Header from '../layouts/Header';
import NavFooter from '../layouts/NavFooter';

const STATS_KEY = 'rhythmTilesStats';

export default function AchievementsScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalGamesPlayed: 0,
    bestScore: 0,
    bestTimeSurvived: 0,
    totalTilesHit: 0,
  });

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const loadStats = async () => {
    try {
      const json = await AsyncStorage.getItem(STATS_KEY);
      if (json) {
        const parsed = JSON.parse(json);
        setStats(parsed);
        console.log('Loaded stats:', parsed);
      }
    } catch (err) {
      console.log('Error loading stats', err);
    }
  };

  useEffect(() => {
    // initial load
    loadStats();

    // reload whenever you come back to this screen
    const unsubscribe = navigation.addListener('focus', loadStats);
    return unsubscribe;
  }, [navigation]);

  const achievements = [
    {
      id: 'first_game',
      title: 'First Run',
      description: 'Finish 1 game of Rhythm Tiles.',
      current: stats.totalGamesPlayed,
      goal: 1,
    },
    {
      id: 'ten_games',
      title: 'Warming Up',
      description: 'Finish 10 games.',
      current: stats.totalGamesPlayed,
      goal: 10,
    },
    {
      id: 'score_10',
      title: 'Getting the Beat',
      description: 'Reach a score of 10 in a single game.',
      current: stats.bestScore,
      goal: 10,
    },
    {
      id: 'score_25',
      title: 'Combo Starter',
      description: 'Reach a score of 25 in a single game.',
      current: stats.bestScore,
      goal: 25,
    },
    {
      id: 'score_50',
      title: 'Rhythm Pro',
      description: 'Reach a score of 50 in a single game.',
      current: stats.bestScore,
      goal: 50,
    },
    {
      id: 'time_20',
      title: 'Survivor I',
      description: 'Survive for 20 seconds in a single run.',
      current: stats.bestTimeSurvived,
      goal: 20,
    },
    {
      id: 'time_40',
      title: 'Survivor II',
      description: 'Survive for 40 seconds in a single run.',
      current: stats.bestTimeSurvived,
      goal: 40,
    },
    {
      id: 'tiles_100',
      title: 'Tile Tapper',
      description: 'Hit 100 tiles across all games.',
      current: stats.totalTilesHit,
      goal: 100,
    },
    {
      id: 'tiles_500',
      title: 'Tile Addict',
      description: 'Hit 500 tiles across all games.',
      current: stats.totalTilesHit,
      goal: 500,
    },
  ];

  const renderAchievement = (achievement) => {
    const progress = Math.min(achievement.current || 0, achievement.goal);
    const percent = achievement.goal > 0 ? progress / achievement.goal : 0;
    const isUnlocked = progress >= achievement.goal;

    return (
      <View
        key={achievement.id}
        style={[
          styles.card,
          isUnlocked && styles.cardUnlocked,
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{achievement.title}</Text>
          <Text style={[styles.status, isUnlocked && styles.statusUnlocked]}>
            {isUnlocked ? 'Unlocked' : 'Locked'}
          </Text>
        </View>

        <Text style={styles.description}>{achievement.description}</Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {progress} / {achievement.goal}
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percent * 100}%` },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <View style={{ flex: 1 }}>
        <Header
          title="Achievements"
          onProfilePress={handleProfilePress}
        />

        <ScrollView contentContainerStyle={styles.container}>
          {/* Summary stats */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your Stats</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Games played</Text>
              <Text style={styles.summaryValue}>{stats.totalGamesPlayed}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Best score</Text>
              <Text style={styles.summaryValue}>{stats.bestScore}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Best time</Text>
              <Text style={styles.summaryValue}>{stats.bestTimeSurvived}s</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total tiles hit</Text>
              <Text style={styles.summaryValue}>{stats.totalTilesHit}</Text>
            </View>
          </View>

          {achievements.map(renderAchievement)}
        </ScrollView>

        <NavFooter navigation={navigation} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 80,
  },
  summaryCard: {
    backgroundColor: '#050608',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00ffff33',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00ffff',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  summaryLabel: {
    color: '#cccccc',
    fontSize: 13,
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#050608',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222831',
  },
  cardUnlocked: {
    borderColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888888',
  },
  statusUnlocked: {
    color: '#00ffff',
  },
  description: {
    fontSize: 13,
    color: '#cccccc',
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#aaaaaa',
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#222831',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#00ffff',
  },
});
