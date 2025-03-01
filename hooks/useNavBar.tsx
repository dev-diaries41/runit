import { useLayoutEffect } from 'react';
import {NavBarProps} from '@/types';
import NavBar from '@/components/ui/common/NavBars';
import { StyleSheet, TextInputProps } from 'react-native';
import { useNavigation } from 'expo-router';

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

interface SearchBarProps {
  onBlur?: TextInputProps['onBlur'];
  /**
   * A callback that gets called when the text changes.
   * It receives the current text value of the search input.
   */
  onChangeText?: TextInputProps['onChange'];
  /**
   * A callback that gets called when search input is closed
   */
  onClose?: () => void;
  /**
   * A callback that gets called when search input has received focus
   */
  onFocus?: TextInputProps['onFocus'];
  /**
   * Text displayed when search field is empty
   */
  placeholder?: string;
}

const useSearchBar = ({ placeholder, onClose, onChangeText, onBlur, onFocus }: SearchBarProps) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions:{autoFocus: true, placeholder, onChangeText, onClose, onBlur, onFocus},
    });
  }, []);

  return {
   
  }
};

export {useNavBar, useSearchBar};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});