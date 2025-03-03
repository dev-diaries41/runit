import { StyleSheet, Text, View } from 'react-native';
import { sizes } from '@/constants/layout';
import { Ionicons } from '@expo/vector-icons';
import { LinkSettingsCardProps } from '@/types';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

const LinkSettingsCard = ({
  settingDescription, 
  settingTitle, 
}: LinkSettingsCardProps) => {

  const color = useThemeColor({}, 'text') 
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
      <Link href={{pathname: "/(tabs)/(settings)/update", params:{updateType: settingTitle}}}>
          <View style={{flexDirection: "column", marginBottom: sizes.layout.small}}>
            <View style={styles.settingsRow}>
              <View style={{flexDirection:'row', gap: sizes.layout.small, alignItems:'center'}}>
                <Ionicons name={getIcon()} color={iconColor} size={24} />
                <Text style={[styles.settingTitle, {color}]}>{settingTitle}</Text>
              </View>
              <Ionicons name="chevron-forward" style={{justifyContent: "flex-end"}} color={iconColor} size={24} />
            </View>
            {settingDescription && <Text style={[styles.settingDescription, {color, opacity:0.7}]}>{settingDescription}</Text>}          
          </View>
        </Link>
    );
}

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
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

export default LinkSettingsCard;
