import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { sizes, themes } from '@/constants/layout';
import { Ionicons } from '@expo/vector-icons';
import { TextButtonProps } from '@/types';

const TextButton = ({ 
    onPress,
    onLongPress, 
    text, 
    fontSize = sizes.font.medium, 
    margin = sizes.layout.small,
    textAlign = 'left',
    icon,
    iconSize=24,
    color = themes.dark.icon,
    iconColor = color,
    justifyContent='flex-start',
    reverse = false,
}: TextButtonProps) => {
    const customizableStyles = {fontSize, color, margin, textAlign}
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}
        style={{flexDirection: reverse? 'row-reverse':'row', alignItems:'center', justifyContent}}>
            { icon && <Ionicons name={icon} size ={iconSize} color={iconColor}/>}
            <Text style={[styles.buttonText, customizableStyles]}>{text}</Text>
        </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    buttonText: {
         
      }
  })
  export default TextButton;