import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { sizes, themes } from '@/constants/layout'
import IconButton from '../buttons/IconButton';
import { useColorScheme } from 'react-native';
import MarkedDownView from '../common/MarkedDownView';
import { useThemeColor } from '@/hooks/useThemeColor';


interface FeatureProps {
    feature: string;
    editFeature: (feature: string) => void
}


const Feature = ({feature, editFeature}: FeatureProps) => {
  const theme = useColorScheme() as "light" | "dark";
  const color = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon')


  return (
    <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
        <MarkedDownView content={`* ${feature}`} color={color}/>
        <IconButton
        icon={'ellipsis-vertical'}
        iconSize={18}
        color={iconColor}
        onPress={() => editFeature(feature)}
        />
    </View>
  )
}

export default Feature;

const styles = StyleSheet.create({
      row:{
        flexDirection: 'row',
        alignItems:'center',
        gap: sizes.layout.small
      }
})