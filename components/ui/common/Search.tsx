import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themes, sizes } from '@/constants/layout';
import { SearchProps } from '@/types';
import InputField from './InputField';

const Search = React.memo(({
  query,
  onSearch,
  onCancel,
  color,
  style,
  placeholder = "Search notes..."
}: SearchProps) => {
  const searchInputRef = useRef<TextInput>(null);

  const handleQueryChange = (text: string) => {
    onSearch(text);
  };

  const handleCancel = () => {
    onCancel()
    if(searchInputRef.current?.isFocused()){
      searchInputRef.current?.blur()
    }
  }

  return (
    <View style={[styles.searchContainer, style]}>
      <Ionicons name='search-outline' size={24} color={themes.placeholder} style={styles.icon} />
      <InputField
        value={query}
        ref={searchInputRef}
        style={[styles.searchInput, { color, borderWidth: 0 }]}
        placeholderTextColor={themes.placeholder}
        onChangeText={(text) => handleQueryChange(text)}
        placeholder={placeholder}
      />
      {query && (
        <TouchableOpacity onPress={handleCancel} style={styles.icon}>
          <Ionicons name='close-circle' size={24} color={themes.placeholder} />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)', 
    borderRadius: sizes.layout.xLarge, 
    paddingHorizontal: sizes.layout.small, 
    paddingVertical:  sizes.layout.small
  },
  searchInput: {
    flex: 1,
    color: themes.dark.text,
    height: 20,
    width: '100%',
    marginLeft: sizes.layout.xSmall,
  },
  icon: {
    marginLeft: 'auto',
  },
});

export default Search;
