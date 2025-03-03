import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { Ionicons } from '@expo/vector-icons';
import { SettingsCardProps } from '@/types';
import { useThemeColor } from '@/hooks/useThemeColor';

const SettingsCard = ({
  onPress, 
  settingDescription, 
  settingTitle, 
  isSwitch = false, 
  value,
  disabled = false
}: SettingsCardProps) => {

  const color = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon')

  const getIcon = () => {
    switch(settingTitle){
      case 'Weight':
        return 'scale'
      case 'Export':
        return 'archive'
      case 'System prompt':
        return 'terminal-sharp'
      case 'Account':
        return 'person'
    }
  }
    return( 
        <View>
          <TouchableOpacity style={{flexDirection: "column", marginBottom: sizes.layout.small}} onPress={onPress} disabled={disabled}>
            <View style={styles.settingsRow}>
              <View style={{flexDirection:'row', gap: sizes.layout.small, alignItems:'center'}}>
                <Ionicons name={getIcon()} color={iconColor} size={24} />
                <Text style={[styles.settingTitle, {color}]}>{settingTitle}</Text>
              </View>
              {isSwitch ? (
                <Switch
                  value={value}
                  onValueChange={onPress}
                  thumbColor={themes.colors.green}
                />
              ) : (
                <Ionicons name="chevron-forward" style={{justifyContent: "flex-end"}} color={iconColor} size={24} />
              )}     
            </View>
            {settingDescription && <Text style={[styles.settingDescription, {color, opacity:0.7}]}>{settingDescription}</Text>}          
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: sizes.layout.medium,
    paddingVertical: sizes.layout.small,
    marginBottom: sizes.layout.small,
  },
  settingTitle:{
    fontSize: sizes.font.medium,
    fontWeight:'500',
  },
  settingDescription:{
    fontSize: sizes.font.small,
    paddingHorizontal: sizes.layout.medium,
    paddingBottom: sizes.layout.medium,
  },
});

export default SettingsCard;
