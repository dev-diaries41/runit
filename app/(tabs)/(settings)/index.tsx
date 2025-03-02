import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import React from 'react';
import { sizes } from '@/constants/layout';
import SettingsCard from '@/components/ui/common/SettingsCard';
import LinkSettingsCard from '@/components/ui/common/LinkSettingsCard';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function SettingsScreen() {
  const cardColor = useThemeColor({}, 'card') 

  
// Define the settings configuration array
const settingsConfig = [
  {
    settingTitle: 'Weight',
    settingDescription: 'Set your body weight',
  },
  {
    onPress: () => {},
    settingTitle: 'Backup',
    settingDescription: 'Backup your RunIt data',
  },
];

  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
        <ThemedView style={[styles.container, { backgroundColor: cardColor}]}>
          {settingsConfig.map((setting, index) => ( setting.onPress? (
              <SettingsCard
              key={index}
              onPress={setting.onPress}
              settingDescription={setting?.settingDescription}
              settingTitle={setting.settingTitle}
            />
          ):(
              <LinkSettingsCard
              key={index}
              settingDescription={setting?.settingDescription}
              settingTitle={setting.settingTitle}
            />
          )
          
          ))}
        </ThemedView>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: sizes.layout.xxLarge * 2,
    paddingTop: sizes.layout.medium,
    borderRadius: sizes.layout.medium,
  },
});
