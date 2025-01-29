import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ui/common/ThemedView';
import React, { useState } from 'react';
import { useSettings } from '@/providers/Settings';
import InputField from '@/components/ui/common/InputField';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { useOnScreenClose } from '@/hooks/useScreenChanges';


export default function SystemPropmptSettings(){
  const {settings, saveAppSettings} = useSettings()
  const [systemPrompt, setSystemPrompt] = useState(settings.systemPrompt)
  useOnScreenClose(() => saveAppSettings({systemPrompt}), [systemPrompt], 'beforeRemove')

  const updateSystemPrompt = (value: string) => {
    setSystemPrompt(value)
  }


  return(
    <ThemedView style={{gap:16}}>
       <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">System Prompt</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <InputField 
        value={systemPrompt} 
        onChangeText={updateSystemPrompt}  
        placeholder='Enter system prompt'
        label='System prompt' 
        style={{minHeight: 100}}
        />
      </ThemedView>
      <ThemedView style={styles.submitButtonWrapper}>
        
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
    submitButtonWrapper: {
      marginTop: 'auto',
      width: "100%"
    },
  });
  