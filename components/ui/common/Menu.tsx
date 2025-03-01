import { StyleSheet, View } from 'react-native'
import { sizes } from '@/constants/layout'
import TextButton from '../buttons/TextButton'
import BottomSheet from '../modals/BottomSheet'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MenuItem } from '@/types'

interface MenuProps {
    menuItems: MenuItem[];
    isVisible: boolean;
    toggleMenu: () => void;
}
export const Menu = ({menuItems, isVisible, toggleMenu }: MenuProps) => {
    const color = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');

    return(       
        <BottomSheet
            visible={isVisible}
            onClose={toggleMenu}
            title={'Main Menu'}
            color={color}
            style={{backgroundColor: cardColor}}
            >
            <View style={[styles.col, {justifyContent: 'space-between'}]}>
                {
                menuItems.map((item, index) =>  <TextButton key={index} onPress={item.onPress} text={item.name} color={color} icon={item.icon}/>)
                }
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        alignItems:'center',
        gap: sizes.layout.small
      },
    col:{
        flexDirection: 'column',
        alignItems:'flex-start',
        gap: sizes.layout.small
    }    
})
