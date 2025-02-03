import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { ExcerciseHistory } from '@/types';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ui/common/ThemedText';
import { formatTime } from '@/lib/runit';

const { height } = Dimensions.get('screen');
const ITEM_HEIGHT = height / 8 - (sizes.layout.medium);

interface HistoryCardProps {
  result: ExcerciseHistory
  index: number
}
const HistoryCard = React.memo(({
    result, 
  index, 

}: HistoryCardProps) => {
  const {name, pace, distance, time, calories } = result;
  const cardColor = useThemeColor({}, 'card') 
  const iconColor = useThemeColor({}, 'icon') 

  return (
    <Link href={{pathname: '/metrics', params: {...result, mode: 'VIEW'}}}>
      <View  style={[styles.cardContainer, { backgroundColor:cardColor, borderColor: Colors.common.border}]}>
        {/* <View style={[styles.rowContainer, { justifyContent: 'space-between', marginLeft:'auto'}]}>
          <View style={styles.navRowItems}>
            <IconButton iconSize={18} icon={"ellipsis-vertical"} onPress={()=>{}} color={iconColor}/>
          </View>
        </View> */}
        <View style={[styles.appTextContainer, {marginBottom: sizes.layout.small, opacity: 0.8}]}>
          <ThemedText type="subtitle">{name}</ThemedText>
        </View>
        <View style={[styles.appTextContainer]}>
          <ThemedText>📏 Distance: {distance} km</ThemedText>
          <ThemedText>⏱ Time: {formatTime(time)}</ThemedText>
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
    justifyContent:'space-between'
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
