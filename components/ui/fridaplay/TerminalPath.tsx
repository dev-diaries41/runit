import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { sizes } from '@/constants/layout'
import { Ionicons } from '@expo/vector-icons';
import { TextButtonProps, Theme } from '@/types'
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface TerminalPathProps extends TextButtonProps {
  disabled?: boolean;
}

const TerminalPath = ({ 
    onPress, 
    text, 
    iconSize=18,
    disabled,
}: TerminalPathProps) => {
    const color = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');
    const iconColor = useThemeColor({}, 'icon');

    return (
      <View style={[styles.tagContainer, {borderColor: tintColor}]}>
        <TouchableOpacity onPress={onPress} disabled={disabled} style={{flexDirection: 'row', alignItems:'center', marginVertical: 8, marginHorizontal: 4}}>
            <Ionicons name={'chevron-down'} size ={iconSize} color={iconColor} style={{marginRight:sizes.layout.xSmall}}/>
            <Text style={[styles.text, {color: tintColor}]}>{text}</Text>
            <Text style={[styles.dollarText, {color, marginEnd: sizes.layout.xSmall}]}>{' $'}</Text>
            <View style={[styles.terminalIndicator, {borderColor: Colors.common.border, width: (iconSize)/2, height:iconSize}]}></View> 
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    text: {
         
      },
      dollarText: {
        fontWeight:'500', 
        opacity:0.8
      },
      terminalIndicator:{
        marginLeft: sizes.layout.xSmall,
        borderWidth:2,
        opacity:0.8,
        backgroundColor:'#fff'
      },
      tagContainer:{
        maxHeight:50,
        borderColor: '#333',
        borderWidth:1,
        borderRadius: sizes.layout.medium,
        paddingHorizontal: sizes.layout.xSmall,
        width:'auto'
      },
  })
  export default TerminalPath