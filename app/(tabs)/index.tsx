import { StyleSheet, Dimensions } from 'react-native';
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
import { useThemeColor } from '@/hooks/useThemeColor';

const {height} = Dimensions.get('window');

export default function Screen() {
  const { elapsedTime, isRunning, start, stop, reset } = useStopwatch();
  const {distance} = useLocation();
  const { runSession, updateRunSession, resetRunSession } = useMetrics(distance, elapsedTime);
  const router = useRouter();
  const tintColor = useThemeColor({}, 'tint');

  const handleStartRun = async() => {
    if(runSession){
      resetRunSession();
    }
    await start()
  }


const handleStopRun = async () => {
  await stop();
  updateRunSession();
};

const handleReset = async () => {
  await reset();
  resetRunSession();
};

  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.title]}>{isRunning? "Run in progress 🏃🏿‍♂️‍➡️" : "Start run"}
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
      {/* {metricsTimeSeries.length > 0 && (
        <Button
          style={{width: "50%", borderColor: tintColor}}
          onPress={()=> {alert("Viewing graph: " + JSON.stringify(metricsTimeSeries))}} 
          text='View graph'/>
      )} */}
        {runSession && (
        <Button
          style={{width: "50%"}}
          onPress={()=>router.push({pathname: '/metrics', params: {...runSession}})} 
          text='View metrics'/>
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
    padding: sizes.layout.medium,
    gap: sizes.layout.medium,
    paddingTop: height/6
  },
  title: {
    fontSize: sizes.font.xxLarge,
    justifyContent:"center",
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
