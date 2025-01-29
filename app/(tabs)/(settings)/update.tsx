import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/common/IconSymbol';
import { useLocalSearchParams } from 'expo-router';
import WeightSettings from '@/components/ui/settings/Weight';
import SystemPropmptSettings from '@/components/ui/settings/SystemPrompt';

 
export default function UpdateSettingsScreen() {
  const { updateType } = useLocalSearchParams();
  const isWeightSettings = updateType === "Weight";
  const isSystemPromptSettings = updateType === "System prompt";

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
       
      {isWeightSettings && <WeightSettings/>}
      {isSystemPromptSettings && <SystemPropmptSettings/>}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
