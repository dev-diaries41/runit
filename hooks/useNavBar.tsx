import { useLayoutEffect } from 'react';
import {NavBarProps} from '@/types';
import NavBar from '@/components/ui/common/NavBars';
import { StyleSheet } from 'react-native';


const useNavBar = ({ navigation }: NavBarProps) => {
  const HeaderRight = () => (
    <NavBar navItems={[]}>
    </NavBar>)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight
    });
  }, []);

  return {
   
  }
};

export default useNavBar;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});