import React, { useState } from 'react'

const useSearch = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    
  return {
    query, 
    setQuery,
    searchResults, 
    setSearchResults,
  }
  
}

export default useSearch