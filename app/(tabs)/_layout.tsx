import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/ui/common/HapticTab';
import { IconSymbol } from '@/components/ui/common/IconSymbol';
import TabBarBackground from '@/components/ui/common/TabBarBackground';
import NavBar from '@/components/ui/common/NavBars';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, 'background')
  const tintColor = useThemeColor({}, 'tint')

  const headerRightButtonsHistoryScreen = [
    {icon: 'bar-chart', onPress: ()=>{}},
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tintColor,
          headerShown: true,
          headerTransparent: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute', // transparent background on iOS for blur effect
            },
            default: {},
          }),
        }}>
        
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: true,
            headerTransparent: false,
            headerShadowVisible: false,
            headerStyle: {backgroundColor}, 
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: 'Run History',
            headerShown: true,
            headerTransparent: false,
            headerShadowVisible: false,
            headerStyle: {backgroundColor}, 
            headerSearchBarOptions:{autoFocus: true},
            headerRight: () => <NavBar navItems={headerRightButtonsHistoryScreen} />,
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.run" color={color} />,
          }}
        />
        
        <Tabs.Screen
          name="(settings)"
          options={{
            title: 'Settings',
            headerShown: true,
            headerTransparent: false,
            headerShadowVisible: false,
            headerStyle: {backgroundColor}, 
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}