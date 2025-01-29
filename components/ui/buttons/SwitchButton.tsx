import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { themes, sizes } from '@/constants/layout';

interface SwitchButtonProps {
    onPress: () => Promise<void> | void; 
    color: string, 
    description?: string; 
    text: string; 
    value?: boolean;
    disabled?: boolean;
}

const SwitchButton = ({
  onPress, 
  color, 
  description, 
  text, 
  value,
  disabled = false
}: SwitchButtonProps) => {

    return( 
        <View style={{marginBottom: sizes.layout.small}}>
          <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={styles.swtichRow}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text style={[styles.text, {color}]}>{text}</Text>
                </View>
                <Switch
                    value={value}
                    onValueChange={onPress}
                    thumbColor={themes.colors.green}
                /> 
            </View>
            {(description && !value)&&<Text style={[styles.description, {color, opacity:0.8}]}>{description}</Text>}          
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  swtichRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: sizes.layout.medium,
    paddingVertical: sizes.layout.xSmall
  },
  text:{
    fontSize: sizes.font.medium,
    fontWeight:'500',
  },
  description:{
    fontSize: sizes.font.small,
    paddingHorizontal: sizes.layout.small,
    paddingBottom: sizes.layout.small,
    
  },
});

export default SwitchButton;
