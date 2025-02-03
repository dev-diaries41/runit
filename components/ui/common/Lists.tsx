import React, { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { AnimatedFlashList } from '@shopify/flash-list';
import {sizes } from '@/constants/layout';
import { useDurationAnimation } from '@/hooks/useAnimation';

interface ListProps<T extends Record<string, any>> {
  items: T[];  
  searchResults: T[];
  query?: string;
  loadMoreItems: () => void;
  renderItem:  ({ item, index }: any) => React.JSX.Element
}

const {height} = Dimensions.get('screen');
const ITEM_HEIGHT = (height / 8) - (sizes.layout.medium);

export default function List<T extends Record<string, any>>({
  items,
  query,
  searchResults,
  loadMoreItems,
  renderItem
}: ListProps<T>){
    const scrollY = useRef(new Animated.Value(0)).current;
    const {animatedValue} = useDurationAnimation({delay: 100})

    return (
    <Animated.View style={[{opacity: animatedValue}]}>
        <AnimatedFlashList
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: true,
            })}
            data={searchResults && query ? searchResults : items}
            keyExtractor={(item: T, index: number) => index.toString()}
            estimatedItemSize={ITEM_HEIGHT}
            renderItem={renderItem}
            getItemLayout={(data: any, index: number) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={true}
        />
    </Animated.View>
    );
};
