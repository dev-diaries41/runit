import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, TouchableOpacity, Text, View , StyleSheet, ViewStyle, StyleProp} from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { Ionicons } from '@expo/vector-icons';
import { ButtonProps, GradientButtonProps, LinkButtonProps } from '@/types';
import { Link } from 'expo-router';

 export const GradientButton  = ({ 
  loading, 
  disabled, 
  text, 
  gradientColor = themes.dark.primaryGradient, 
  icon, 
  fontSize = sizes.font.medium,
  iconSize=24,
  color = themes.light.text,
  style,
  ...rest
  }: GradientButtonProps) => {
    return (
      <LinearGradient colors={gradientColor} style={[styles.button, style]}>
        <TouchableOpacity style={[disabled && { opacity: 0.5 }]} disabled={disabled} {...rest}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <View style={styles.rowContainer}>
            {text && <Text style={[styles.buttonText, {fontSize, color}]}>{text}</Text>}
            {icon && <Ionicons name={icon} size={iconSize} color={color} />}
          </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
    );
  };


  export const Button = ({ 
    loading, 
    disabled, 
    text, 
    icon, 
    fontSize,
    color = themes.dark.text,
    iconSize = 24,
    style,
    ...rest
  }:ButtonProps) => {
  
    return (
    <TouchableOpacity
        style={[
          styles.button,
          style,
          disabled && { opacity: 0.5 },
        ]}
        disabled={disabled}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <View style={styles.rowContainer}>
            {text && <Text style={[styles.buttonText, {fontSize, color}]}>{text}</Text>}
            {icon && <Ionicons name={icon} size={iconSize} color={color} />}
          </View>
        )}
      </TouchableOpacity>
     
    );
  };

  export const LinkButton = ({ 
    loading, 
    disabled, 
    text, 
    icon, 
    fontSize,
    color = themes.dark.text,
    iconSize = 24,
    style,
    ...rest
  }:LinkButtonProps & {  style?:  StyleProp<ViewStyle>
  }) => {
  
    return (

    <View
        style={[
          styles.button,
          style,
          disabled && { opacity: 0.5 },
        ]}
      >
        <Link  {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <View style={styles.rowContainer}>
            {text && <Text style={[styles.buttonText, {fontSize, color}]}>{text}</Text>}
            {icon && <Ionicons name={icon} size={iconSize} color={color} />}
          </View>
        )}
        </Link>
      </View>

    );
  };
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: themes.dark.primary,
      width: 'auto',
      height: 'auto',
      borderRadius: sizes.layout.large,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: "center",
      marginHorizontal: sizes.layout.small,
      elevation: 2,
      shadowColor: themes.light.text,
      shadowOffset: {width: 5, height: 10},
      shadowOpacity: 1,
      shadowRadius: sizes.layout.small,
      padding: sizes.layout.small,
    },
    buttonText: {
      color: themes.dark.text,
      fontWeight:'bold',
    },
 
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizes.layout.xSmall
    },
  });
  