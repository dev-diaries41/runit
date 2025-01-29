import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { sizes, themes } from '@/constants/layout';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Button } from '../buttons/Buttons';
import { formatTime } from '@/lib/runit';

interface StopwatchProps {
  elapsedTime: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ elapsedTime, isRunning, start, stop, reset }) => {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, {borderColor: textColor}]}>
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      </View>
      <View style={styles.buttons}>
        <Button 
        style={{width: 50, height:50, borderRadius: 25}}
        icon={isRunning? 'pause':'play'}
        iconSize={18}
        onPress={isRunning? stop:start}
        />
       {(isRunning || elapsedTime > 0) && <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
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
  },
  timerContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: sizes.layout.medium,
  },
  timer: {
    fontSize: sizes.font.xLarge,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'column',
    gap: sizes.layout.medium,
    alignItems:'center',
    marginTop:32  
  },
  button: {
    padding: sizes.layout.small,
    borderRadius: sizes.layout.small,
  },
  buttonText: {
    color: 'white',
    fontSize: sizes.font.small,
  },
});
