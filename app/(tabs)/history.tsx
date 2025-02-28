import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { sizes } from '@/constants/layout';
import Search from '@/components/ui/common/Search';
import ParallaxScrollView from '@/components/ui/common/ParallaxScrollView';
import { useThemeColor } from '@/hooks/useThemeColor';
import useSearch from '@/hooks/useSearch';
import EmptyScreen from '@/components/ui/common/EmptyScreen';
import List from '@/components/ui/common/Lists';
import { useRunIt } from '@/providers/History';
import { RunSession } from '@/types';
import HistoryCard from '@/components/ui/runit/HistoryCard';
import { fetchAsyncStorageBatch } from '@/lib/storage';
import { ThemedView } from '@/components/ui/common/ThemedView';


export default function Screen({}) {
  const {exerciseHistory, setExerciseHistory} = useRunIt();
  const [loadedAllItems, setLoadedItems] = useState(false);
  const {setQuery, query, searchResults, setSearchResults} = useSearch();
  const color = useThemeColor({}, 'text');
  
  const BATCH_SIZE = 50;

  const loadMoreItems = async () => {
    if(loadedAllItems)return;
    try {
      const existingKeys = new Set(exerciseHistory.map(item => item.id));
      const {retrievedItems, batchKeysLength} = await fetchAsyncStorageBatch<RunSession>(BATCH_SIZE, key => key.includes("run") && !existingKeys.has(key))
      setExerciseHistory(prevHistory => [...prevHistory, ...retrievedItems]);
  
      if (batchKeysLength < BATCH_SIZE) {
        setLoadedItems(true);
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    }
  };
  

  const handleSearch = (query: string) => {
    try {
      setQuery(query)
      const filteredNotes = exerciseHistory.filter((exerciseResult: RunSession) =>
        exerciseResult.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredNotes);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  
  const handleCancel = () => {
    setQuery('');
    setSearchResults([])
  };  

  const renderItem = ({ item, index }: any) => {
    return (
    <HistoryCard result={item} index={index}/>
  )};

  
  if(exerciseHistory.length === 0){
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
    <ThemedView style={{flex:1}}>
      <View style={styles.searchBar}>
        <Search
        query={query}
        onSearch={handleSearch}
        onCancel={handleCancel}
        color={color}
        placeholder='Search exercise history...'
        />
      </View>
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>  
      <ThemedView style={styles.container}>
          <List
          items={exerciseHistory}
          searchResults={searchResults}
          query={query}
          loadMoreItems={loadMoreItems}
          renderItem={renderItem}
          />
        </ThemedView>   
      </ParallaxScrollView>
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

  excerciseHistoryContainer:{
    flex:1,
    alignItems:'center',
    height: '100%',
    width: "auto",
    marginBottom: 'auto',
    paddingTop: sizes.layout.medium,
  },
  
  searchBar:{
    flex:0.1,
    alignItems:'center',
    marginVertical: sizes.layout.small,
    paddingHorizontal: sizes.layout.medium,
    marginTop: StatusBar.currentHeight? StatusBar.currentHeight * 3: 0
  }
});
