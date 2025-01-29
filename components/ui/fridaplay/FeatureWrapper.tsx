import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Feature from './Feature'
import { sizes, themes } from '@/constants/layout'
import TextButton from '../buttons/TextButton'
import BottomSheet from '../modals/BottomSheet'
import { ThemedView } from '@/components/ui/common/ThemedView'
import { ThemedText } from '@/components/ui/common/ThemedText'
import { useColorScheme } from 'react-native'
import InputField from '../common/InputField'
import { Button } from '../buttons/Buttons'
import { useFridaPlay } from '@/Providers/FridaPlay'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { App } from '@/types'

interface FeatureProps {
    features: string[];
    newFeature: string;
    deleteFeature: (feature: string) => void;
    updateApp: (key: keyof App, value: string) => void;
    updateNewFeature: (value: string) => void;
}

const FeaturesWrapper = ({features, newFeature, updateApp, updateNewFeature, deleteFeature, }: FeatureProps) => {
    const [featureToEdit, setFeatureToEdit] = useState<string | null >(null);
    const color = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');
    const cardColor = useThemeColor({}, 'card');

    const handleEditFeature = (featureToEdit: string) => {
        setFeatureToEdit(featureToEdit)
    }

    const closeEditMenu = () => {
        setFeatureToEdit(null)
    }

    const handleDelete = () => {
        if(!featureToEdit)return;
        deleteFeature(featureToEdit);
        closeEditMenu();
    }

    return(
    <ThemedView style ={[styles.featuresContainer]}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <ThemedText type='subtitle'>Features ✨</ThemedText>
            <Button 
            onPress={()=> updateApp('features', newFeature)} 
            text={'Add feature'}
            fontSize={sizes.font.xSmall}
            iconSize={18}
            disabled={!newFeature}
            color={color}
            style={{backgroundColor: 'transparent', borderWidth: 1, borderColor: tintColor}}
            />
        </View>
        <InputField
        value={newFeature} 
        onChangeText={updateNewFeature} 
        placeholder='Enter new app feature'
        multiline={true}
        label='App feature'
        />
        <View style={{gap: 8}}>
        {features.map((feature, index)=>{
            return(
            <Feature key={index.toString()} feature={feature} editFeature={handleEditFeature}/>
            )
        })}
        </View>
       
        <BottomSheet
            visible={!!featureToEdit}
            onClose={closeEditMenu}
            title={'Edit feature'}
            color={color}
            style={{backgroundColor: cardColor}}
            >
            <View style={[styles.col, {justifyContent: 'space-between'}]}>
                <TextButton onPress={handleDelete} text='Delete' color={themes.colors.red} icon={'trash'} disabled={!featureToEdit}/>
            </View>
        </BottomSheet>
    </ThemedView>
    )
}

export default FeaturesWrapper;

const styles = StyleSheet.create({
    featuresContainer: {
        flex:1,
        gap: sizes.layout.medium, 
        marginVertical: sizes.layout.medium,
    },
    row:{
        flexDirection: 'row',
        alignItems:'center',
        gap: sizes.layout.small
      },
    featureRow: {
        gap: 4,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        borderColor: Colors.common.border,
        borderWidth:1,
        borderRadius: 16,
        padding: 4

    },
    col:{
    flexDirection: 'column',
    alignItems:'flex-start',
    gap: sizes.layout.small
    }    
})
