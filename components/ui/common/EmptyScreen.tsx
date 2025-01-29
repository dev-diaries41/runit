import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { themes, sizes } from '@/constants/layout'
import { Ionicons } from '@expo/vector-icons'

interface EmptyScreenProps {
    text?:string;
    description?:string;
    icon?: any;
}

const EmptyScreen = ({
    text = 'Posts', 
    description ='No Posts were found', 
    icon = 'send'
}: EmptyScreenProps) => {
  return (
    <View style={styles.container}>
        <Ionicons name={icon} size={120} color={themes.placeholder}/>
        <Text style={styles.heading}>{text}</Text>
        <Text style={styles.text}>{description}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
      },
    heading:{
        fontSize: sizes.font.xxLarge,
        fontWeight:'500',        
        color:themes.placeholder,
    },
    text: {
        fontSize: sizes.font.medium,
        color: themes.placeholder,
          
      },
})

export default EmptyScreen;