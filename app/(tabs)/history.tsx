import React, { useState } from 'react';
import { View, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Dimensions } from 'react-native';
import { sizes } from '@/constants/layout';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import useSearch from '@/hooks/useSearch';
import EmptyScreen from '@/components/ui/common/EmptyScreen';
import List from '@/components/ui/common/Lists';
import { useRunIt } from '@/providers/History';
import { MenuItem, RunSession } from '@/types';
import HistoryCard from '@/components/ui/runit/HistoryCard';
import { fetchAsyncStorageBatch } from '@/lib/storage';
import { ThemedView } from '@/components/ui/common/ThemedView';
import { useRunHistoryNavBar, useSearchBar } from '@/hooks/useNavBar';
import { Menu } from '@/components/ui/common/Menu';

const BATCH_SIZE = 50;
const {height} = Dimensions.get('window')

export default function Screen({}) {
  const {runHistory, setRunHistory} = useRunIt();
  const [loadedAllItems, setLoadedItems] = useState(false);
  const {setQuery, query, searchResults, setSearchResults} = useSearch();
  const {isMenuVisible, toggleMenu} = useRunHistoryNavBar();

  const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    try {
      const query = e.nativeEvent.text
      setQuery(query)
      const filteredNotes = runHistory.filter((exerciseResult: RunSession) =>
        exerciseResult.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredNotes);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  
  const handleCancelSearch = () => {
    setQuery('');
    setSearchResults([])
  };

  useSearchBar({
    placeholder:'Search exercise history...',
    onChangeText: handleSearch,
    onClose: handleCancelSearch
  })

  const menuItems:MenuItem[] = [
    {icon: 'image', name: 'View Charts', onPress: toggleMenu},
    {icon: 'camera', name: 'Export data', onPress: toggleMenu}
  ]

  const loadMoreItems = async () => {
    if(loadedAllItems)return;
    try {
      const existingKeys = new Set(runHistory.map(item => item.id));
      const {retrievedItems, batchKeysLength} = await fetchAsyncStorageBatch<RunSession>(BATCH_SIZE, key => key.includes("run") && !existingKeys.has(key))
      setRunHistory(prevHistory => [...prevHistory, ...retrievedItems]);
  
      if (batchKeysLength < BATCH_SIZE) {
        setLoadedItems(true);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    }
  };
  

  const renderItem = ({ item, index }: any) => {
    return (
    <HistoryCard result={item} index={index}/>
  )};

  
  if(runHistory.length === 0){
    return(
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>         
        <EmptyScreen text='Exercise History' description='No exercise history' icon='fitness' />
            <View style={{position: 'fixed', bottom: 40, marginTop: 100}}>
        </View>
      </ParallaxScrollView>
    )
  }

  return (
    <ThemedView style={[styles.container, {opacity: isMenuVisible? 0.5 : 1}]}>
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>  
        <ThemedView style={styles.runHistoryContainer}>
          <List
          items={runHistory}
          searchResults={searchResults}
          query={query}
          loadMoreItems={loadMoreItems}
          renderItem={renderItem}
          />
        </ThemedView>   
      </ParallaxScrollView>
        <View style={styles.bottomSheetContainer}>
          <Menu menuItems={menuItems} isVisible={isMenuVisible} toggleMenu={toggleMenu}/>
        </View>
    </ThemedView>
  );
  
};

const styles = StyleSheet.create({
  headerImage: {
    bottom: -120,
    left: -35,
    position: 'absolute',
    },

  container: {
    flex: 1,
    paddingTop: sizes.layout.small,
    gap: 16
  },

  runHistoryContainer:{
    flex:1,
    height: '100%',
    maxHeight: height - sizes.layout.xxLarge * 1.5,
    minHeight: height - sizes.layout.xxLarge * 1.5,
    paddingTop: sizes.layout.xxLarge * 1.5,
  },

  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999, 
  },
});
