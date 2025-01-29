import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { sizes, themes } from '@/constants/layout'
import TextButton from '../buttons/TextButton'
import BottomSheet from '../modals/BottomSheet'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useGlobalMenuActions } from '@/providers/Globals'
import { MenuItem } from '@/types'



interface MainMenuProps {
    menuItems: MenuItem[]
}
export const MainMenu = ({menuItems }: MainMenuProps) => {
    const {toggleMenu, showMenu} = useGlobalMenuActions()
    const color = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');

    return(       
        <BottomSheet
            visible={showMenu}
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
    featuresContainer: {
        flex:1,
        gap: sizes.layout.medium, 
        marginVertical: sizes.layout.medium,
    },
    row:{
        flexDirection: 'row',
        alignItems:'center',
        gap: sizes.layout.small
      },
    featureRow: {
        gap: 4,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        borderColor: Colors.common.border,
        borderWidth:1,
        borderRadius: 16,
        padding: 4

    },
    col:{
    flexDirection: 'column',
    alignItems:'flex-start',
    gap: sizes.layout.small
    }    
})
