import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { sizes, themes } from '@/constants/layout';
import { TimerProps } from '@/types';


const Timer  = ({ duration, onFinished, message = 'Remaining Time' }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  // Start when component first mounts
  useEffect(() => {
        startTimeout(duration)
  }, []);

  const startTimeout = async (duration: number) => {
    setRemainingTime(duration);
    setTimeout(() => {
        endTimer()
    }, duration);
  
    // Save remaining time in AsyncStorage
    const timeoutObject = {
      duration: duration,
      timestamp: Date.now()
    };
    await AsyncStorage.setItem('timeout', JSON.stringify(timeoutObject));
    return startCountDown();
  };

  const startCountDown = () => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        return prevTime === 0 ? prevTime : prevTime - 1000
    });
    }, 1000);
    return () => clearInterval(timer);
  };

// Clear the persisted timeout when timeout ends
  const endTimer = async () => {
    await AsyncStorage.removeItem('timeout'); 
    setRemainingTime(0);
    onFinished();
  }

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);


  return (
    <Text style={styles.timer}>
      {`${message}: ${minutes} mins ${seconds} secs`}
    </Text>
  );};

export default Timer;

const styles = StyleSheet.create({
    timer: {
        fontSize: sizes.font.medium,
        margin: sizes.layout.medium,
        color: themes.dark.text,
        textAlign: 'center'
      },
 });
