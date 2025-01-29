import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';

const useStopwatch = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    loadElapsedTime();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appState.current === 'background' && nextAppState === 'active') {
      const savedTime = await AsyncStorage.getItem('stopwatch');
      if (savedTime) {
        const { elapsed, timestamp, running } = JSON.parse(savedTime);
        const now = Date.now();
        if (running) {
          setElapsedTime(elapsed + (now - timestamp));
        }
      }
    }
    appState.current = nextAppState;
  };

  const loadElapsedTime = async () => {
    const savedTime = await AsyncStorage.getItem('stopwatch');
    if (savedTime) {
      const { elapsed, timestamp, running } = JSON.parse(savedTime);
      const now = Date.now();
      if (running) {
        setElapsedTime(elapsed + (now - timestamp));
        start();
      } else {
        setElapsedTime(elapsed);
      }
    }
  };

  const start = async () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1000);
    }, 1000);
    setIntervalId(id);
    await AsyncStorage.setItem('stopwatch', JSON.stringify({ elapsed: elapsedTime, timestamp: Date.now(), running: true }));
  };

  const stop = async () => {
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
    await AsyncStorage.setItem('stopwatch', JSON.stringify({ elapsed: elapsedTime, running: false }));
  };

  const reset = async () => {
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
    setElapsedTime(0);
    await AsyncStorage.removeItem('stopwatch');
  };

  return { elapsedTime, isRunning, start, stop, reset };
};

export default useStopwatch;
