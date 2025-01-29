import {memo} from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ui/common/ThemedText';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

interface AnimatedEmojiProps {
  emojiUnicodeString?: string
}

export const AnimatedEmoji = memo(({emojiUnicodeString = '🌐'}: AnimatedEmojiProps) =>{
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>{emojiUnicodeString}</ThemedText>
    </Animated.View>
  );
})

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
