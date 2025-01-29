import React, { useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { AnimatedFlashList } from '@shopify/flash-list';
import {sizes } from '@/constants/layout';
import AppCard from './AppCard';
import { useFridaPlay } from '@/Providers/FridaPlay';
import { useDurationAnimation } from '@/hooks/useAnimation';
import { App } from '@/types';

interface ListAppProps {
  loadMoreNotes: () => void;
  query?: string
  searchResults: App[]
}

const {height} = Dimensions.get('screen');
const ITEM_HEIGHT = (height / 8) - (sizes.layout.medium);

export default function ListApps({
  loadMoreNotes,
  query,
  searchResults
}: ListAppProps){
    const {apps} = useFridaPlay();
    const scrollY = useRef(new Animated.Value(0)).current;
    const {animatedValue} = useDurationAnimation({delay: 100})

    const renderNote = ({ item, index }: any) => {
        return (
        <AppCard app={item} index={index}/>
      )};

    

    return (
    <Animated.View style={[{opacity: animatedValue}]}>
        <AnimatedFlashList
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: true,
            })}
            data={searchResults && query ? searchResults : apps}
            keyExtractor={(item: App, index: number) => index.toString()}
            estimatedItemSize={ITEM_HEIGHT}
            renderItem={renderNote}
            getItemLayout={(data: any, index: number) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
            onEndReached={loadMoreNotes}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={true}
        />
    </Animated.View>
    );
};

const styles = StyleSheet.create({
    appsContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
});