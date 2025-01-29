import { useState, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMEOUT_DURATION = 1 * 60 * 1000; // 1 minutes in milliseconds

export const useTimeout = () => {
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [timeOutDuration, setTimeoutDuration] = useState(TIMEOUT_DURATION);

  // Check if timeout is currently active on component mount
  useLayoutEffect (()=> {
    const checkTimeout = async () => {
      const timeout = await AsyncStorage.getItem('timeout');
      if (!timeout) {
        return null;
      }
      const parsedTimeout = JSON.parse(timeout);
      const remaining = parsedTimeout.duration - (Date.now() - parsedTimeout.timestamp);
      if(remaining){
        setTimeoutDuration(remaining)
        startTimeout()
      }
    };

    checkTimeout()

  }, [])

  const startTimeout = () => {
    setIsTimeoutActive(true);
  };

  const endTimeout = () => {
    setIsTimeoutActive(false)
  }


  return { timeOutDuration, startTimeout, isTimeoutActive , endTimeout};
};

export default useTimeout;
