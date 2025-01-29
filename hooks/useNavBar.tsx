import { useLayoutEffect } from 'react';
import { App, NavBarProps} from '@/types';
import NavBar from '@/components/ui/common/NavBars';
import { StyleSheet } from 'react-native';
import TerminalPath from '@/components/ui/fridaplay/TerminalPath';


const useNavBar = ({ app, navigation }: NavBarProps & {app: App}) => {
  const HeaderRight = () => (
    <NavBar navItems={[]}>
      <TerminalPath
        onPress={()=>{}}
        icon="chevron-down"
        text={`/${app.name}`}
      />
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