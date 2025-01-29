import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';


interface AnimationProps {
  duration?: number, 
  delay?: number
  startFrom?: number
}

interface ViewModeAnimationProps extends AnimationProps {
  viewMode: boolean
}

const durationAnimation = (animatedValue: Animated.Value, duration: number) => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: duration,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  }).start();
}

export const useViewModeAnimation = ({
  viewMode, 
  duration = 300, 
  delay = 0,
  startFrom,
}: ViewModeAnimationProps) => {
  const animatedValue = useRef(new Animated.Value(startFrom? startFrom : 0)).current;

  useEffect(() => {
    if (!viewMode) {
      const timer = setTimeout(() => {
       durationAnimation(animatedValue, duration)
      }, delay); // Optional delay of animation

      return () => clearTimeout(timer);
    } else {
      // Reset the animation value when switching to view mode
      animatedValue.setValue(0);
    }
  }, [viewMode]);

  return {animatedValue};
};

export const useDurationAnimation = ({
  duration = 300, 
  delay = 0,
  startFrom
}: AnimationProps) => {
  const animatedValue = useRef(new Animated.Value(startFrom? startFrom : 0)).current;

  useEffect(() => {
      const timer = setTimeout(() => {
       durationAnimation(animatedValue, duration)
      }, delay); // Optional delay of animation

      return () => clearTimeout(timer);
  }, []);

  return {animatedValue};
};

