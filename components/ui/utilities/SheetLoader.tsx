import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import Spacer from './Spacer';
import { sizes, themes } from '@/constants/layout';
import { LoaderProps } from '@/types';
import IconButton from '../buttons/IconButton';
import { Colors } from '@/constants/colors';
import { useThemeColor } from '@/hooks/useThemeColor';

const Divider = ({
}) => {
    return (
        <View style={{borderBottomWidth: 1, width: "100%", borderColor: Colors.common.border }}></View>
    )
}

const SheetLoader = ({ 
    loaderTitle = 'Loading...', 
    loaderDescription,
    color,
    onMinimize,
    showLoader
}: LoaderProps) => {
    const tintColor = useThemeColor({}, 'tint');
    return (
        <Modal visible={showLoader} animationType="fade" transparent>
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={[styles.row]}>
                    <View style={{flexDirection:'row', gap:8}}>
                    <ActivityIndicator size={24} color={tintColor} />
                    <Text style={[styles.text, {color: tintColor}]}>{loaderTitle}</Text>
                </View>
                <IconButton color={ tintColor} onPress={onMinimize}  icon={'close'}/>      
            </View>
        <Spacer/>
        <Divider/>
        <Text style={[styles.text, {color, margin: sizes.layout.small}]}>{loaderDescription}</Text>
        </View>
    </View>
    </Modal>

    );
};

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        position:'absolute',
        right:0, 
        left:0,
        top:0,
        backgroundColor: themes.dark.primary,
        width:"100%",
        // borderRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius:16,
        zIndex:100,
        borderWidth:1,
        borderColor:  themes.dark.primary,

    },
    container: {
        flex:1,
        padding: 8,
        backgroundColor: themes.dark.card,
        width:"100%",
        // borderRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius:16,
        opacity: 0.95,

    },
    loader:{
    },  
    text:{
        fontSize: sizes.font.medium,
        textAlign:'left',
    },
    minimize:{
        position: 'absolute', 
        bottom: 40, 
        left: 0, 
        paddingLeft: sizes.layout.xSmall,
        opacity:0.7
    },
    row:{
        flexDirection: 'row', 
        justifyContent:"space-between",
        alignItems:'center',
        marginHorizontal: sizes.layout.medium,
        gap:sizes.layout.medium,
      },
});

export default SheetLoader;