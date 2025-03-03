import { StyleSheet } from 'react-native';
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
import { sendNotification } from '@/lib/notifications';

export default function Screen() {
  const { elapsedTime, isRunning, start, stop, reset } = useStopwatch();
  const {distance} = useLocation(isRunning);
  const { runSession, updateRunSession, resetRunSession } = useMetrics(distance, elapsedTime);
  const router = useRouter();

  const handleStartRun = async() => {
    if(runSession){
      resetRunSession();
    }
    sendNotification('Run in progress', `You started your run at ${new Date().toLocaleTimeString()}`)
    await start()
  }


const handleStopRun = async () => {
  await stop();
  updateRunSession();
  sendNotification('Run stopped', `You stopped your run at ${new Date().toLocaleTimeString()}`)
};

const handleReset = async () => {
  await reset();
  resetRunSession();
};

const handleEndRun = async () => {
  router.push({pathname: '/metrics', params: {...runSession}}) 
  setTimeout(() => handleReset(), 1000);
};


  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      {distance > 0 && <ThemedText style={styles.distanceOverview}>Distance: {distance} km</ThemedText>}
      <ThemedView style={styles.container}>
        <ThemedText type='title'>{isRunning? "Run in progress 🏃🏿‍♂️‍➡️" : "Start run"}
        </ThemedText>
        <Stopwatch
          elapsedTime={elapsedTime}
          isRunning={isRunning}
          start={handleStartRun}
          stop={handleStopRun}
          reset={handleReset}
        />
      </ThemedView>
      <ThemedView style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {runSession && (
        <Button
          style={{width: "50%"}}
          onPress={handleEndRun} 
          text='End run'/>
      )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: sizes.layout.medium,
    gap: sizes.layout.medium,
  },
  distanceOverview:{
    position: 'absolute', 
    top: 48, 
    zIndex: 2, 
    right: 8,
    fontSize: sizes.font.small
  }
});
