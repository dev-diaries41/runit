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
import { useEffect, useState } from 'react';
import BottomSheet from '@/components/ui/modals/BottomSheet';
import InputField from '@/components/ui/common/InputField';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Screen() {
  const { elapsedTime, isRunning, start, stop, reset } = useStopwatch();
  const {distance} = useLocation(isRunning);
  const { runSession, updateRunSession, resetRunSession } = useMetrics(distance, elapsedTime);
  const [isSettingGoal, setIsSettingGoal] = useState(false)
  const [goal, setGoal] = useState<string>("")
  const cardColor = useThemeColor({}, 'card')

  const router = useRouter();

  useEffect(() => {
    const parsedGoal = parseFloat(goal)
    if(!isNaN(parsedGoal) && (distance >= parsedGoal) && elapsedTime > 0){
      handleStopRun()
      if(runSession){
        handleEndRun()      
      }
    }
  }, [goal, distance, elapsedTime, runSession?.id])

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
    setGoal("")
  };

  const handleEndRun = async () => {
    router.push({pathname: '/metrics', params: {...runSession}}) 
    setTimeout(() => handleReset(), 1000);
  };

  const toggleGoalSetter = () => {
    setIsSettingGoal(prev => !prev)
  }

  const updateGoal = (distance: string) => {
    setGoal(distance)
  }

  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <ThemedView style={styles.runSummaryRow}>
        <Button
          disabled={isRunning}
          fontSize={sizes.font.small}
          style={{alignSelf: 'flex-start', paddingHorizontal: 16}}
          onPress={toggleGoalSetter} 
          text='Set goal'/>

          <ThemedView style={{}}>
              <ThemedText style={{fontSize: sizes.font.small, fontWeight:"bold"}}>📏 Distance: {distance} km</ThemedText>
              {goal && <ThemedText style={{fontSize: sizes.font.small, fontWeight:"bold"}}>🎯 Goal: {goal} km</ThemedText>}
          </ThemedView>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText type='title'>{isRunning? "Run in progress 🏃🏿‍♂️‍➡️" : "Start run"}</ThemedText>
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
      <BottomSheet
        style={{minHeight: 200, backgroundColor:cardColor}}
        visible={isSettingGoal}
        onClose={toggleGoalSetter}
        title='Set goal 🎯'
        >
       <InputField
          style={{marginTop: sizes.layout.small}}
          keyboardType='numeric'
          onChangeText={updateGoal}
          value={goal}
          placeholder='Enter target distance in km e.g 5'
          />
      </BottomSheet>
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

  runSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: sizes.layout.xLarge
  }
});
