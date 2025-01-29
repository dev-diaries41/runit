import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themes, sizes } from '@/constants/layout';
import { InfoCardProps } from '@/types';


const InfoCard = ({ 
  title, 
  description, 
  metadata, 
  icon, 
  metadataIcon, 
  color = themes.light.text,
  iconColor = themes.light.primary,
  backgroundColor = themes.dark.card,
  borderColor = 'transparent',
}: InfoCardProps) => {
  return (
    <>
      <View style={[styles.cardContainer, {backgroundColor, borderColor}]}>
        <View style = {[styles.rowContainer]}>
          <Text numberOfLines={1} style={[styles.title, {color:iconColor}]}>{title}</Text>
          <Ionicons name={icon} size={24} color={iconColor} style={{marginLeft:"auto"}} />
        </View>
        {description && 
        <View style={[styles.rowContainer, {marginEnd: sizes.layout.small}]}>
          <Text style={[styles.infoText, {color}]}>{description}</Text>
        </View>}
        {metadata && 
        <View style={[styles.rowContainer, {paddingEnd: sizes.layout.medium}]}>
          {metadataIcon && <Ionicons name={metadataIcon} size={24} color={iconColor} />}
          <Text numberOfLines={2} style={[styles.highlighterText, {color:iconColor}]}>{metadata}</Text>
        </View> 
        } 
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: sizes.layout.medium,
    marginBottom:sizes.layout.medium,
    padding: sizes.layout.medium,
    elevation:5,
    shadowColor:themes.light.text,
    shadowOffset:{
      width:5,
      height:10
    },
    shadowOpacity:1,
    shadowRadius:sizes.layout.medium,
  },

  cardContent: {
    borderRadius: sizes.layout.medium,
  },
  title: {
    fontSize: sizes.font.large,
    color: 'white',
    overflow:"hidden",
    paddingEnd:sizes.layout.small,
    fontWeight:'bold'
  },
 
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.layout.small,
    gap: sizes.layout.xSmall,
  },
  highlighterText: {
    fontSize: sizes.font.small,
    color: 'white',
    fontWeight:'500'
  },
  infoText: {
    fontSize: sizes.font.medium,
    color: themes.dark.text,
      
  },

  highlighter: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: sizes.layout.small,
    padding:sizes.layout.xSmall,
  },
});

export default InfoCard;
