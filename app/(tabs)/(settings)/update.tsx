import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/common/IconSymbol';
import { useLocalSearchParams } from 'expo-router';
import WeightSettings from '@/components/ui/settings/Weight';


export default function UpdateSettingsScreen() {
  const { updateType } = useLocalSearchParams();
  const isWeightSettings = updateType === "Weight";

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
