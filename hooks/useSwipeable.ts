import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';

interface UseSwipleableOptions {
  maxTranslateX?: number;
  tapThreshold?: number;
}

interface UseSwipleableReturn {
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
  panGesture: ReturnType<typeof Gesture.Pan>;
  swipedOpen: boolean;
  reset: () => void;
}

/**
 * Custom hook to handle swipe-to-delete logic.
 *
 * @param options - { maxTranslateX, tapThreshold }
 */
export const useSwipleable = (options: UseSwipleableOptions = {}): UseSwipleableReturn => {
  const { maxTranslateX = -80, tapThreshold = 5 } = options;
  const [swipedOpen, setSwipedOpen] = useState(false);

  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Capture the current translation at the beginning
      contextX.value = translateX.value;
    })
    .onUpdate((event) => {
      let newTranslate = contextX.value + event.translationX;
      // Clamp the value between 0 (closed) and maxTranslateX (open)
      if (newTranslate < maxTranslateX) newTranslate = maxTranslateX;
      if (newTranslate > 0) newTranslate = 0;
      translateX.value = newTranslate;
    })
    .onEnd((event) => {
      // If the gesture movement is very small, treat it as a tap (close swipe)
      if (Math.abs(event.translationX) < tapThreshold) {
        translateX.value = withSpring(0);
        runOnJS(setSwipedOpen)(false);
      } else {
        // If swiped more than half the allowed distance, snap open; otherwise, snap closed.
        if (translateX.value < maxTranslateX / 2) {
          translateX.value = withSpring(maxTranslateX);
          runOnJS(setSwipedOpen)(true);
        } else {
          translateX.value = withSpring(0);
          runOnJS(setSwipedOpen)(false);
        }
      }
    });

  const reset = () => {
    translateX.value = withSpring(0);
    setSwipedOpen(false);
  };

  return { animatedStyle, panGesture, swipedOpen, reset };
};
