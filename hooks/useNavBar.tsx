import { useLayoutEffect, useState } from 'react';
import NavBar from '@/components/ui/common/NavBars';
import { TextInputProps } from 'react-native';
import { useNavigation } from 'expo-router';

export const useRunHistoryNavBar = ({viewCharts}: {viewCharts: () => void}) => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => setIsMenuVisible(prev => !prev);

  const headerRightButtonsHistoryScreen = [
    // { icon: 'menu', onPress: toggleMenu },
    {icon: 'bar-chart', onPress: viewCharts},

  ];

  const HeaderRight = () => (
    <NavBar navItems={headerRightButtonsHistoryScreen}/>
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight
    });
  }, []);

  return {
    isMenuVisible, 
    toggleMenu
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

export const useSearchBar = ({ placeholder, onClose, onChangeText, onBlur, onFocus }: SearchBarProps) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions:{autoFocus: true, placeholder, onChangeText, onClose, onBlur, onFocus},
    });
  }, []);

  return {}
};
