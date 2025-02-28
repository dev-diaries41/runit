import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import { useLocalSearchParams } from 'expo-router';
import { formatTime } from '@/lib/helpers';
import Spacer from '@/components/ui/utilities/Spacer';
import { Button } from '@/components/ui/buttons/Buttons';
import { useRunIt } from '@/providers/History';

const {height} = Dimensions.get('window');

export default function Screen() {
  const params = useLocalSearchParams();
  const {pace, calories, distance, time, mode, name, id} = params;
  
  const [runName, setRunName] = useState(name as string);
  const [hasSaved, setHasSaved] = useState(false);
  const {saveExerciseResults} = useRunIt()

  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');


  const metrics = [
    { label: 'Avg. Pace', value: parseFloat(pace as string).toFixed(2) },
    { label: 'Time', value: formatTime(parseInt(time as string)) },
    { label: 'Calories', value: calories },
  ];

  const handleSave = async() => {
    await saveExerciseResults({
      id: id as string,
      name: runName,
      pace: parseFloat(pace as string), 
      calories: parseInt(calories as string),
      distance: parseFloat(distance as string),
      time: parseInt(time as string)
    })
    setHasSaved(true);
  }

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <TextInput
          style={[styles.title, { color: textColor }]}
          value={runName}
          onChangeText={setRunName}
        />
        <Text style={[styles.distance, { color: tintColor }]}>{parseFloat(distance as string).toFixed(2)}</Text>
        <Text style={[styles.distanceLabel, { color: textColor }]}>Kilometres</Text>
        <Spacer/>
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <View key={index} style={[styles.metricItem]}> 
              <Text style={[styles.metricLabel, { color: textColor }]}>{metric.label}</Text>
              <Text style={[styles.metricValue, { color: tintColor }]}>{metric.value}</Text>
            </View>
          ))}
        </View>
      </ThemedView>
      {mode !== "VIEW" && <Button
      disabled={hasSaved}
      style={{width: "50%", marginTop: height * 0.1}}
      onPress={handleSave} 
      text='Save metrics'/>}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizes.layout.small,
    paddingTop: StatusBar.currentHeight? StatusBar.currentHeight * 2 : sizes.layout.xxLarge,
    
  },
  title: {
    fontSize: sizes.font.xLarge,
    marginBottom: sizes.layout.large,
    textAlign: 'center',
  },
  distance: {
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  distanceLabel: {
    fontSize: sizes.font.large,
    marginBottom: sizes.layout.large,
    textAlign: 'center',
  },
  metricsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.layout.small,
    // gap: sizes.layout.xSmall
  },
  metricItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: sizes.font.medium,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: sizes.font.xLarge,
    textAlign: 'center',
  },
});
