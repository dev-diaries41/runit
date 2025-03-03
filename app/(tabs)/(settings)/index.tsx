import { StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { ThemedView } from '@/components/ui/common/ThemedView';
import React from 'react';
import { sizes } from '@/constants/layout';
import SettingsCard from '@/components/ui/common/SettingsCard';
import LinkSettingsCard from '@/components/ui/common/LinkSettingsCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { backup } from '@/lib/storage';
import { ThemedText } from '@/components/ui/common/ThemedText';


export default function SettingsScreen() {
  const cardColor = useThemeColor({}, 'card') 

  
const settingsConfig = [
  {
    settingTitle: 'Weight',
    settingDescription: 'Set your body weight',
  },
  {
    onPress: backup,
    settingTitle: 'Export',
    settingDescription: 'Export your RunIt data',
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
        <ThemedView style={styles.appInfoContainer}>
          <Image source={require('../../../assets/images/runit.png')} style={styles.logo} resizeMode="contain"/>
          <ThemedText type='subtitle'  style={{marginBottom: sizes.layout.medium}}>RunIt</ThemedText>
          <ThemedText style={{fontSize: sizes.font.small}}>Version: 1.1.5</ThemedText>
          <ThemedText style={{fontSize: sizes.font.small}}>© 2025 FPF Labs</ThemedText>
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
  appInfoContainer: {
    marginTop: sizes.layout.xxLarge * 2,
    marginBottom: sizes.layout.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width:96,
    height:96,
    marginTop: sizes.layout.xxLarge,
    marginBottom: sizes.layout.medium,
  }
});
