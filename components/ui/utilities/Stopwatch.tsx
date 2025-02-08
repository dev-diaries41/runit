import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { sizes } from '@/constants/layout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Button } from '../buttons/Buttons';
import { formatTime } from '@/lib/helpers';
import { ThemedText } from '../common/ThemedText';

interface StopwatchProps {
  elapsedTime: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const {width} = Dimensions.get('window')
const CIRCLE_SIZE = width * 0.7

const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime, isRunning, start, stop, reset }) => {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, {borderColor: textColor}]}>
        <ThemedText style={styles.timer}>{formatTime(elapsedTime)}</ThemedText>
      </View>
      <View style={styles.buttons}>
        <Button 
        style={{width: 50, height:50, borderRadius: 25}}
        icon={isRunning? 'pause':'play'}
        iconSize={18}
        onPress={isRunning? stop:start}
        />
       {(isRunning || elapsedTime > 0) && <TouchableOpacity style={styles.button} onPress={reset}>
          <ThemedText style={styles.buttonText}>Reset</ThemedText>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizes.layout.medium,
    gap: sizes.layout.medium
  },
  timerContainer: {
    width: CIRCLE_SIZE ,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE/2,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizes.layout.medium,
  },
  timer: {
    fontSize: sizes.font.xxLarge * 1.5,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: sizes.layout.medium
  },
  buttons: {
    flexDirection: 'column',
    gap: sizes.layout.medium,
    alignItems:'center',
    // marginTop:32  
  },
  button: {
    padding: sizes.layout.small,
    borderRadius: sizes.layout.small,
  },
  buttonText: {
    fontSize: sizes.font.medium,
  },
});
