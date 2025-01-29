import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SettingsProvider } from '@/providers/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Settings } from '@/types';
import { Colors } from '@/constants/Colors';
import { GlobalMenuActionsProvider } from '@/providers/Globals';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [storedSettings, setStoredSettings] = useState<Settings|null>(null)
  const [appIsReady, setAppIsReady] = useState(false);

  if(colorScheme){
     SystemUI.setBackgroundColorAsync(Colors[colorScheme].background)
  }


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const loadAppData = async () => {
    try {

      const [settingsItem] = await Promise.all([
        AsyncStorage.getItem('settings'),

      ]);

      if (settingsItem) {
        setStoredSettings(JSON.parse(settingsItem));
      }
    } catch (error) {
      console.error("Error loading data from AsyncStorage", error);
    }finally{
      setAppIsReady(true);
    }
  };

  useLayoutEffect(() => {
   loadAppData();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!(loaded && appIsReady)) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalMenuActionsProvider>
      <SettingsProvider storedSettings={storedSettings}>
      <Stack initialRouteName='(tabs)'>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="metrics" options={{ headerShown: true, headerTitle:'', headerTransparent: true }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </SettingsProvider>
      </GlobalMenuActionsProvider>
    </ThemeProvider>
  );
}
