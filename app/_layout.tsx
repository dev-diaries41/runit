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
import {RunSession, Settings } from '@/types';
import { Colors } from '@/constants/Colors';
import { GlobalMenuActionsProvider } from '@/providers/Globals';
import { RunItProvider } from '@/providers/History';
import { fetchAsyncStorageBatch } from '@/lib/storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [storedSettings, setStoredSettings] = useState<Settings|null>(null);
  const [storedExcerciseHistory, setStoredExcerciseHistory] = useState<RunSession[]>([])
  const [appIsReady, setAppIsReady] = useState(false);

  if(colorScheme){
     SystemUI.setBackgroundColorAsync(Colors[colorScheme].background);
  }


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const loadAppData = async () => {
    try {
      const existingKeys = new Set(storedExcerciseHistory.map(item => item.id));
      const [settingsItem, batchResults] = await Promise.all([
        AsyncStorage.getItem('settings'),
        fetchAsyncStorageBatch<RunSession>(50, key => key.includes("run") && !existingKeys.has(key))
      ]);

      if (settingsItem) {
        setStoredSettings(JSON.parse(settingsItem));
      }

      if(batchResults.retrievedItems?.length > 0){
        setStoredExcerciseHistory(batchResults.retrievedItems);
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
      <RunItProvider storedExcerciseHistory={storedExcerciseHistory}>
        <Stack initialRouteName='(tabs)'>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="metrics" options={{ headerShown: true, headerTitle:'', headerTransparent: true }} />
          <Stack.Screen name="analysis" options={{ headerShown: true, headerTitle:'', headerTransparent: true }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        </RunItProvider>
      </SettingsProvider>
      </GlobalMenuActionsProvider>
    </ThemeProvider>
  );
}
