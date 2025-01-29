import React, { createContext, useState, ReactNode, useContext } from 'react';

interface MediaGenContextProps {
  assets: string[]; //
  setAssets: React.Dispatch<React.SetStateAction<string[]>>; 
}

const MediaContext = createContext<MediaGenContextProps | undefined>(undefined);

interface MediaProps {
  children: ReactNode;
}

const MediaProvider = ({ children }: MediaProps) => {
  const [assets, setAssets] = useState<string[]>([]);

  return (
    <MediaContext.Provider value={{ 
      assets, 
      setAssets
      }}>
      {children}
    </MediaContext.Provider>
  );
};

// Hook for using the MediaContext
const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};

export { MediaContext, MediaProvider, useMediaContext };
