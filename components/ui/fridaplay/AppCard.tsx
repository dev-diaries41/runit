import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import IconButton from '../buttons/IconButton';
import { App } from '@/types';
import { useFridaPlay } from '@/Providers/FridaPlay';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ui/common/ThemedText';

const { height } = Dimensions.get('screen');
const ITEM_HEIGHT = height / 8 - (sizes.layout.medium);

interface AppCardProps {
  app: App
  index: number
}
const AppCard = React.memo(({
  app, 
  index, 

}: AppCardProps) => {
  const { name, description } = app
  const cardColor = useThemeColor({}, 'card') 
  const iconColor = useThemeColor({}, 'icon') 

  return (
    <Link href={{pathname: '/(tabs)/(idea)/view', params: {name}}}>
      <View  style={[styles.cardContainer, { backgroundColor:cardColor, borderColor: Colors.common.border}]}>
        <View style={[styles.rowContainer, { justifyContent: 'space-between', marginLeft:'auto'}]}>
          <View style={styles.navRowItems}>
            <IconButton iconSize={18} icon={"ellipsis-vertical"} onPress={()=>{}} color={iconColor}/>
          </View>
        </View>
        <View style={[styles.appTextContainer]}>
          <ThemedText type="subtitle">{name}</ThemedText>
        </View>
        <View style={[styles.appTextContainer]}>
          <ThemedText>{description}</ThemedText>
        </View>
      </View>
    </Link>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    width:"100%",
    flexDirection:'column',
    minHeight: ITEM_HEIGHT,
    padding: sizes.layout.medium,
    borderRadius: sizes.layout.medium,
    borderBottomColor: themes.borderColor,
  },
  tag: {
    fontSize: sizes.font.small,
    color: themes.dark.text,
    overflow: 'hidden',
    opacity:0.7
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTextContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  navRowItems:{
    flexDirection: 'row', 
    justifyContent:"space-evenly",
    alignItems:'center',
    gap:sizes.layout.small
  },
  typeTag: {
    opacity: 0.7, 
    padding: sizes.layout.small,
    borderRadius: sizes.layout.medium,
    marginLeft: sizes.layout.small
  }
});

export default AppCard;
