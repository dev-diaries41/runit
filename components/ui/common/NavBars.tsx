import React from "react"
import { ActivityIndicator, StyleSheet, useColorScheme, View } from "react-native"
import IconButton from "../buttons/IconButton"
import { sizes, themes } from "@/constants/layout"
import { Theme } from "@/types"
import { ReactNode } from "react"
import { useThemeColor } from "@/hooks/useThemeColor"


type NavItem = {
    icon: string;
    onPress: () => Promise<void> | void;
    itemLoading?: boolean;
}


const NavBar = ({ navItems, children }: { navItems: NavItem[]; children?: ReactNode }) => {
    const iconColor = useThemeColor({}, 'icon')
  return (
      <View style={styles.navRowItems}>
          {navItems.map((item, index) => (
              <React.Fragment key={index}>
                  {item.itemLoading ? (
                      <ActivityIndicator size={24} color={iconColor} />
                  ) : (
                      <IconButton key={index} icon={item.icon} onPress={item.onPress} color={iconColor} />
                  )}
              </React.Fragment>
          ))}
          {children}
      </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
    navRowItems:{
      flexDirection: 'row', 
      justifyContent:"space-between",
      alignItems:'center',
      marginHorizontal: sizes.layout.medium,
      gap:sizes.layout.medium
    },
    tagContainer:{
      justifyContent:"flex-start",
      alignItems:'flex-start',
      maxHeight:50,
      borderColor: '#333',
      borderWidth:1,
      borderRadius: sizes.layout.medium,
      paddingHorizontal: sizes.layout.small,
      width:'auto'
    },
  });