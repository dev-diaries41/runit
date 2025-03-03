import React from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { sizes } from '@/constants/layout';
import { RunSession } from '@/types';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { formatTime } from '@/lib/helpers';
import IconButton from '../buttons/IconButton';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSwipleable } from '@/hooks/useSwipeable';


const { height } = Dimensions.get('screen');
const ITEM_HEIGHT = height / 8 - sizes.layout.medium;
const MAX_TRANSLATE_X = -80; // maximum left swipe value (reveals delete button)
const TAP_THRESHOLD = 5; // threshold to distinguish tap vs. swipe

interface RunSessionCardProps {
  result: RunSession;
  index: number;
  onDelete: (result: RunSession) => void;
}

const RunSessionCard = React.memo(({ result, index, onDelete }: RunSessionCardProps) => {
  const { name, distance, time } = result;
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const router = useRouter();

  const { animatedStyle, panGesture, swipedOpen, reset } = useSwipleable({
    maxTranslateX: MAX_TRANSLATE_X,
    tapThreshold: TAP_THRESHOLD,
  });

  // Handle tap on the card.
  // If the card is swiped open, a tap will close it instead of navigating.
  const handlePress = () => {
    if (swipedOpen) {
      reset();
    } else {
      router.push({ pathname: '/metrics', params: { ...result, mode: 'VIEW' } });
    }
  };

  // Handle delete and snap the card back to its original position.
  const handleDelete = () => {
    onDelete(result);
    reset();
  };

  return (
    <Pressable onPress={handlePress} style={{ marginBottom: sizes.layout.small }}>
      <View style={[styles.container, { borderRadius: sizes.layout.medium }]}>
        {/* Delete Button is positioned behind the animated card */}
        <View style={styles.deleteButton}>
          <IconButton onPress={handleDelete} icon={'trash'} color='white' style={{marginLeft:'auto', marginRight: 20}}/>
        </View>
        {/* Use GestureDetector to attach the pan gesture */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.cardContainer,
              { backgroundColor: cardColor, borderColor },
              animatedStyle as {
                transform: {
                    translateX: number;
                }[];
            },
              styles.animatedCard,
            ]}
          >
            <View style={styles.rowContainer}>
              <ThemedText type="defaultSemiBold">
                🗓️ {name.replace('Run', '').trim()}
              </ThemedText>
            </View>
            <View style={styles.appTextContainer}>
              <ThemedText style={{ opacity: 0.8 }}>
                ⏱ Time: {formatTime(time)}
              </ThemedText>
              <ThemedText style={{ opacity: 0.8 }}>
                📏 Distance: {distance.toFixed(2)} km
              </ThemedText>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ITEM_HEIGHT,
    position: 'relative',
  },
  animatedCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardContainer: {
    width: '100%',
    minHeight: ITEM_HEIGHT,
    padding: sizes.layout.medium,
    borderRadius: sizes.layout.medium,
    borderWidth: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: sizes.layout.small,
  },
  appTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: sizes.layout.medium,
    paddingVertical: sizes.layout.xSmall,
  },
  deleteButton: {
    position: 'absolute',
    right: 1,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: 'red',
    borderRadius: sizes.layout.medium,
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizes.layout.small,
  },
  deleteText: {
    color: 'white',
    marginLeft: 'auto',
  },
});

export default RunSessionCard;
