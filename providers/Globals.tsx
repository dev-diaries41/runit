import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useMediaContext } from './Media';
import { useRouter } from 'expo-router';
import { MenuItem } from '@/types';

const menuActions = ["TAKE PICTURE", "UPLOAD MEDIA", "UPLOAD DOCS"] as const
type GlobalMenuActions = typeof menuActions[number]

interface GlobalMenuActionsGenContextProps {
  showMenu: boolean; //
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>; 
}

const GlobalMenuActionsContext = createContext<GlobalMenuActionsGenContextProps | undefined>(undefined);

interface GlobalMenuActionsProps {
  children: ReactNode;
}

const GlobalMenuActionsProvider = ({ children }: GlobalMenuActionsProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <GlobalMenuActionsContext.Provider value={{ 
        showMenu,
        setShowMenu
      }}>
      {children}
    </GlobalMenuActionsContext.Provider>
  );
};

// Hook for using the GlobalMenuActionsContext
const useGlobalMenuActions = () => {
  const context = useContext(GlobalMenuActionsContext);
  if (!context) {
    throw new Error('useGlobalMenuActionsContext must be used within a GlobalMenuActionsProvider');
  }

  const router = useRouter();
  const {setShowMenu, showMenu} = context

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const onUploadImage = async() => {
    toggleMenu();
}


const onTakePicture = async() => {
  toggleMenu();
}

const menuItems:MenuItem[] = [
  {icon: 'image', name: 'Upload Image', onPress: onUploadImage},
  {icon: 'camera', name: 'Take Picture', onPress: onTakePicture}
]
  
  return {
    showMenu,
    toggleMenu,
    menuItems
  };
};

export { GlobalMenuActionsContext, GlobalMenuActionsProvider, useGlobalMenuActions };
