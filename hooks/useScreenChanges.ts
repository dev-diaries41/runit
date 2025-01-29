import {useEffect, useLayoutEffect } from 'react';
import { EventMapCore, NavigationRoute, useNavigation } from '@react-navigation/native';

export const useOnScreenOpen = (onScreenOpen: () => void, dependencies: any[] =[]) => {
  const navigation = useNavigation()
    useLayoutEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      onScreenOpen();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, ...dependencies]);
};

type ListenerType = keyof EventMapCore<Readonly<{ key: string; index: number; routeNames: never[]; history?: unknown[] | undefined; routes: NavigationRoute<any, never>[]; type: string; stale: false; }>>

export const useOnScreenClose = (onScreenClose: () => void, dependencies: any[] =[], listenerType: ListenerType = 'blur') => {
  const navigation = useNavigation()
    useEffect(() => {

      
      const unsubscribe = navigation.addListener(listenerType, () => {
        onScreenClose();
      });
      return () => {
        unsubscribe();
      };
    }, [navigation, ...dependencies]);
  };
  