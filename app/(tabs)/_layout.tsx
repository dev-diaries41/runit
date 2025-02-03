import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/ui/common/HapticTab';
import { IconSymbol } from '@/components/ui/common/IconSymbol';
import TabBarBackground from '@/components/ui/common/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import NavBar from '@/components/ui/common/NavBars';
import { useGlobalMenuActions } from '@/providers/Globals';
import { MainMenu } from '@/components/ui/common/GlobalMenu';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const { toggleMenu, menuItems } = useGlobalMenuActions(); // Ensure you have a state for menu open/close

  const headerRightButtons = [
    { icon: 'menu', onPress: toggleMenu },
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerRight: () => <NavBar navItems={headerRightButtons} />,
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
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: 'Run History',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="figure.run" color={color} />,
          }}
        />
        
        <Tabs.Screen
          name="(settings)"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
      </Tabs>

      {/* Global Bottom Sheet, rendered outside of the individual screens */}
      <View style={styles.bottomSheetContainer}>
        <MainMenu menuItems={menuItems}/>
      </View>
    </>
  );
}

// Styling to ensure proper positioning of the BottomSheet
const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999, // Ensure the BottomSheet overlays above the tabs
  },
});
