import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { RunSession } from '@/types';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { formatTime } from '@/lib/helpers';
import IconButton from '../buttons/IconButton';

const { height } = Dimensions.get('screen');
const ITEM_HEIGHT = height / 8 - (sizes.layout.medium);

interface HistoryCardProps {
  result: RunSession
  index: number
}
const HistoryCard = React.memo(({
    result, 
  index, 

}: HistoryCardProps) => {
  const {name, distance, time } = result;
  const cardColor = useThemeColor({}, 'card') 
  const iconColor = useThemeColor({}, 'icon') 
  const borderColor = useThemeColor({}, "border") 

  return (
    <Link style ={{marginBottom: sizes.layout.small}} href={{pathname: '/metrics', params: {...result, mode: 'VIEW'}}}>
      <View  style={[styles.cardContainer, { backgroundColor:cardColor, borderColor}]}>
        <View style={[styles.rowContainer, { justifyContent: 'space-between', marginBottom: sizes.layout.small}]}>
          <ThemedText type="defaultSemiBold" style={{marginRight:'auto'}}>🗓️ {name.replace("Run", "").trim()}</ThemedText>
          <View style={[styles.navRowItems]}>
            <IconButton iconSize={18} icon={"ellipsis-vertical"} onPress={()=>{}} color={iconColor}/>
          </View>
        </View>
        <View style={[styles.appTextContainer]}>
          <ThemedText style={{opacity: 0.8}}>⏱ Time: {formatTime(time)}</ThemedText>
          <ThemedText style={{opacity: 0.8}}>📏 Distance: {distance.toFixed(2)} km</ThemedText>
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
    borderWidth: 1
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
    justifyContent: "flex-start",
    gap: sizes.layout.medium,
    paddingVertical: sizes.layout.xSmall
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

export default HistoryCard;
