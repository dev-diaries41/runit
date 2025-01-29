import { createContext, useState, useContext, ReactNode } from 'react';
import { Settings } from '@/types';
import { saveSettings } from '@/lib/storage';
import { DefaultSettings } from '@/constants/globals';

interface SettingsContextProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>; 
}


const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
  storedSettings: Settings | null
}

const SettingsProvider = ({ children , storedSettings}: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(storedSettings|| DefaultSettings)

  return (
    <SettingsContext.Provider value={{
      settings, 
      setSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  const {setSettings, settings} = context

  const saveAppSettings = async(settingsToUpdate: Partial<Settings>) => {
    await saveSettings(settingsToUpdate);
    setSettings(prev => ({...prev, ...settingsToUpdate}))
  }

  return {
    settings,
    saveAppSettings,
  };
};


export { SettingsContext, SettingsProvider, useSettings };