import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, TouchableOpacity, Text, View , StyleSheet} from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { Ionicons } from '@expo/vector-icons';
import { ButtonProps, GradientButtonProps } from '@/types';


  export const ColumnButton = ({ 
    loading, 
    disabled, 
    text, 
    icon, 
    fontSize = sizes.font.small,
    color = themes.dark.text,
    styles: buttonStyles,
    ...rest
  }: ButtonProps) => {
    const customizableButtonTextStyles = {fontSize, color: color}
  
    return (
    <View style={styles.columnContainer}>
    <TouchableOpacity style={[disabled && { opacity: 0.5 }]}  disabled={disabled} {...rest}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.columnContainer}>
            {icon && <Ionicons name={icon} size={24} color={color} />}
          </View>
        )}
      </TouchableOpacity>
      {text && <Text style={[styles.columnButtonText, customizableButtonTextStyles]}>{text}</Text>}

      </View>
    );
  };

  export const GradientColumnButton  = ({ 
    loading, 
    disabled, 
    onPress, 
    text, 
    gradientColor = themes.dark.primaryGradient, 
    icon, 
    fontSize = sizes.font.small,
    color = themes.light.text,
    styles: buttonStyles,
    ...rest
    }: GradientButtonProps) => {
        const customizableButtonTextStyles = {fontSize, color: color === themes.dark.text? themes.dark.primary : themes.light.primary}
      return (
        <View style={styles.columnContainer}>
        <LinearGradient colors={gradientColor} style={[styles.button, buttonStyles]}>
          <TouchableOpacity style={[disabled && { opacity: 0.5 }]}  disabled={disabled} {...rest}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={styles.columnContainer}>
              {icon && <Ionicons name={icon} size={24} color={color} />}
            </View>
            )}
          </TouchableOpacity>
        </LinearGradient>
        {text && <Text style={[styles.columnButtonText, customizableButtonTextStyles]}>{text}</Text>}
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
      elevation: 3,
      shadowColor: themes.light.text,
      // iOS
      shadowOffset: {
        width: 50,
        height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: sizes.layout.small,
    },
    icon: {
      marginRight: sizes.layout.xSmall,
    },
    columnContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',      
    },
    columnButtonText: {
      color: themes.dark.text,
      fontWeight:'bold',
      marginTop:sizes.layout.xSmall,
    },
  });
  