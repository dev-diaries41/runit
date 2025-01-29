import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import { useLocalSearchParams } from 'expo-router';
import { Metrics } from '@/types';
import { formatTime } from '@/lib/runit';

export default function Screen() {
  const [runTitle, setRunTitle] = useState('Wednesday Night Run');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const params = useLocalSearchParams();
  const {pace, calories, distance, time} = params
  
  const metrics = [
    { label: 'Avg. Pace', value: pace },
    { label: 'Time', value: formatTime(parseInt(time as string)) },
    { label: 'Calories', value: calories },
  ];

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <TextInput
          style={[styles.title, { color: textColor }]}
          value={runTitle}
          onChangeText={setRunTitle}
        />

        <Text style={[styles.distance, { color: tintColor }]}>{distance}</Text>
        <Text style={[styles.distanceLabel, { color: textColor }]}>Kilometres</Text>

        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={[styles.metricItem]}> 
              <Text style={[styles.metricLabel, { color: textColor }]}>{metric.label}</Text>
              <Text style={[styles.metricValue, { color: tintColor }]}>{metric.value}</Text>
            </View>
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizes.layout.xxLarge,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: sizes.layout.large,
    textAlign: 'center',
  },
  distance: {
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  distanceLabel: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: sizes.layout.large,
    textAlign: 'center',
  },
  metricsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.layout.small,
  },
  metricItem: {
    width: '33%',
    marginBottom: sizes.layout.medium,
    padding: sizes.layout.small,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
