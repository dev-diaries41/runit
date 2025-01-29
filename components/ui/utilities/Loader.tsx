import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { MotiView } from 'moti';
import Spacer from './Spacer';
import { sizes, themes } from '@/constants/layout';
import { Button } from '../buttons/Buttons';
import { LoaderProps } from '@/types';


const FullScreenLoader = ({ 
    size = 80, 
    loaderDescription = 'Loading...', 
    color=themes.dark.primary ,
    onMinimize,
}: LoaderProps) => {
    return (
        <View style={styles.container}>
        <MotiView
        style={[
            styles.loader,
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: size / 10,
                borderColor: themes.dark.primary,
            },
        ]}
        from={{ transform: [{ scaleX: 1 }, { scaleY: 1 }], opacity: 1 }}
        animate={{
            transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            opacity: 0.5,
        }}
        transition={{
            type: 'spring',
            damping: 16,
            stiffness: 60,
            mass: 1,
            overshootClamping: false,
            loop: true,
        }}
    />
    <Spacer/>
    <Text style={[styles.text, {color}]}>{loaderDescription}</Text>
    <View style={styles.minimize}>
        <Button text='Minimize' color={themes.dark.text} onPress={onMinimize} width={'auto'} height={'auto'} fontSize={sizes.font.small}/>      
    </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
    },
    text: {
        margin: sizes.layout.small,
        fontSize: sizes.font.medium,
        fontWeight:'500',        
        textAlign:'center',
    },
    minimize:{
        position: 'absolute', 
        bottom: 40, 
        left: 0, 
        paddingLeft: sizes.layout.xSmall,
        opacity:0.7
    }
});

export default FullScreenLoader;