import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ui/common/ThemedView';
import React, { useState } from 'react';
import { useSettings } from '@/providers/Settings';
import InputField from '@/components/ui/common/InputField';
import { Settings } from '@/types';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { useOnScreenClose } from '@/hooks/useScreenChanges';

export default function WeightSettings(){
  const {settings, saveAppSettings} = useSettings()
  const [weight, setWeight] = useState<Settings['weight']>(settings.weight)
  useOnScreenClose(() => saveAppSettings({weight}), [weight], 'beforeRemove')

  const updateWeight = ( value: string) => {
    setWeight(value)
  }

  return(
    <ThemedView style={{gap: 16}}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Weight</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <InputField 
          value={weight} 
          onChangeText={updateWeight}  
          placeholder='Enter weight in kg'
          label='Weight'
          />
        </ThemedView>
      </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});