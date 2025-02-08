import React, { useState } from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import Stopwatch from '@/components/ui/utilities/Stopwatch';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { sizes } from '@/constants/layout';
import useStopwatch from '@/hooks/useStopwatch';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { Button } from '@/components/ui/buttons/Buttons';
import { useRouter } from 'expo-router';
import { useLocation } from '@/hooks/runit/useLocation';
import { useMetrics } from '@/hooks/runit/useMetrics';

const {height} = Dimensions.get('window');

export default function Screen() {
  const { elapsedTime, isRunning, start, stop, reset } = useStopwatch();
  const {distance} = useLocation();
  const { metrics, computeMetrics, resetMetrics } = useMetrics(distance, elapsedTime);
  const router = useRouter();

  const handleStartRun = async() => {
    await start()
    if(metrics){
      resetMetrics();
    }
  }


const handleStopRun = async () => {
  await stop();
  computeMetrics();
};

const handleReset = async () => {
  await reset();
  resetMetrics();
};

  
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
      onPress={()=>router.push({pathname: '/metrics', params: {...metrics}})} 
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
    gap: sizes.layout.medium,
    paddingTop: height/6
  },
  title: {
    fontSize: sizes.font.xxLarge,
    justifyContent:"center",
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
