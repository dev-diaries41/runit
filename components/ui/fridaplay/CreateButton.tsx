import { StyleSheet, View } from 'react-native'
import React from 'react'
import { sizes, themes } from '@/constants/layout';
import { LinkButton } from '../buttons/Buttons'
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CreateButton () {
    const tintColor = useThemeColor({}, 'tint');
    const iconColor = useThemeColor({}, 'icon');  
    return (
    <View style={[styles.CreateButtonContainer, {
        backgroundColor: tintColor,
        borderColor: tintColor,

        }]}>
      <LinkButton
        href={'/(tabs)'}
        color={iconColor}
        icon={'add'}
        iconSize={30}
        style={{elevation:0, backgroundColor: 'transparent', padding:0}}
      />
    </View>
  )
};

const styles = StyleSheet.create({
    CreateButtonContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:sizes.layout.medium,
        borderRadius:30,
        borderWidth:2,
        height:50,
        width:50,
        opacity:0.8,
        elevation: 4,
        shadowColor: themes.light.text,
        shadowOffset: {
          width: 5,
          height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: sizes.layout.medium,
      },
})