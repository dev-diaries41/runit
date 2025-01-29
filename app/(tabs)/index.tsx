import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import Stopwatch from '@/components/ui/utilities/Stopwatch';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import useStopwatch from '@/hooks/useStopwatch';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { Button } from '@/components/ui/buttons/Buttons';
import { useRouter } from 'expo-router';
import { useLocation } from '@/hooks/runit/useLocation';
import { calculateAvgPace, calculateCalories } from '@/lib/runit';
import { Metrics } from '@/types';

const {height, width} = Dimensions.get('window');


export default function Screen() {
  const { elapsedTime, isRunning, start, stop, reset } = useStopwatch();
  const {distance} = useLocation();
  const [metrics, setMetrics] = useState<Metrics|null>(null)
  const router = useRouter();

  const handleStartRun = async() => {
    await start()
    if(metrics){
      setMetrics(null);
    }
  }

  const handleStopRun = async() => {
    await stop()
    const calories = calculateCalories(80, distance);
    const pace = calculateAvgPace(distance, elapsedTime);
    setMetrics({calories, pace, distance, time: elapsedTime});
  }

  const handleReset = async() => {
    await reset();
    setMetrics(null);
  }
  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.title]}>{isRunning? "Run in progress 🏃🏿‍♂️‍➡️" : "Start run"}
        </ThemedText>
        <Stopwatch
          elapsedTime={elapsedTime}
          isRunning={isRunning}
          start={handleStartRun}
          stop={handleStopRun}
          reset={handleReset}
        />
      </ThemedView>
      {metrics && <Button
      style={{width: "50%"}}
      onPress={()=>router.push({pathname: '/metrics', params: metrics})} 
      text='View metrics'/>}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizes.layout.medium,
    height: height - 120,
    gap: sizes.layout.medium
  },
  title: {
    fontSize: sizes.font.xxLarge,
    justifyContent:"center",
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
