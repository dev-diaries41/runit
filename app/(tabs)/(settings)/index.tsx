import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { IconSymbol } from '@/components/ui/common/IconSymbol';
import React from 'react';
import { sizes } from '@/constants/layout';
import SettingsCard from '@/components/ui/common/SettingsCard';
import { ThemedText } from '@/components/ui/common/ThemedText';
import LinkSettingsCard from '@/components/ui/common/LinkSettingsCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AnimatedEmoji } from '@/components/ui/common/AnimatedEmoji';


export default function SettingsScreen() {
  const cardColor = useThemeColor({}, 'card') 
  const tintColor = useThemeColor({}, 'tint') 

  
// Define the settings configuration array
const settingsConfig = [
  {
    settingTitle: 'Weight',
    settingDescription: 'Set your body weight',
    updateType: 'Weight'
  },
  {
    onPress: () => {},
    settingTitle: 'Backup',
    settingDescription: 'Backup your RunIt data',
  },
];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={300}
          color={tintColor}
          name="gear"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
        <AnimatedEmoji emojiUnicodeString={'⚙️'} />
      </ThemedView>
      <ThemedView style={[styles.settingsContainer, { backgroundColor: cardColor}]}>
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
            updateType={setting?.updateType}
          />
        )
        
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    // color: '#808080',
    bottom: -120,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container:{
    flex:1,
    padding: sizes.layout.small
  },
  
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: sizes.layout.small,
    borderRadius: sizes.layout.medium,
    opacity:0.95
  },
  settingsContainer: {
    paddingTop: sizes.layout.medium,
    backgroundColor: 'transparent',
    borderRadius: sizes.layout.medium,
    width: "100%",
  },
});
