import { createContext, useState, useContext, ReactNode } from 'react';
import { RunSession } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RunItContextProps {
  selectedRunSession: RunSession | null;
  setSelectedRunSession: React.Dispatch<React.SetStateAction< RunSession | null>>; 
  runHistory: RunSession[];
  setRunHistory: React.Dispatch<React.SetStateAction< RunSession[]>>; 
}

const RunItContext = createContext<RunItContextProps | undefined>(undefined);

interface RunItProviderProps {
  children: ReactNode;
  storedExcerciseHistory: RunSession[]
}

const RunItProvider = ({ children, storedExcerciseHistory }: RunItProviderProps) => {
  const [selectedRunSession, setSelectedRunSession] = useState<RunSession | null>(null);
  const [runHistory, setRunHistory] = useState<RunSession[]>(storedExcerciseHistory);

  return (
    <RunItContext.Provider value={{
      selectedRunSession, 
      setSelectedRunSession,
      runHistory, 
      setRunHistory,
    }}>
      {children}
    </RunItContext.Provider>
  );
};

const useRunIt = () => {
  const context = useContext(RunItContext);
  if (!context) {
    throw new Error('useRunIt must be used within a RunItProvider');
  }
  const {selectedRunSession, setSelectedRunSession, runHistory, setRunHistory} = context;


  const saveRunSession = async(result: RunSession) => {
    try {
        setRunHistory(prev => [...prev, result])
        await AsyncStorage.setItem(result.id, JSON.stringify(result));     
    } catch (error) {
      console.error('Error saving run session');
    }
  }

  const  exerciseIdToName = (id: string): string => {
    const timestamp = parseInt(id.split('_')[0]);
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear())} Run`;  
  }

  const viewRunSession = (appToView: RunSession) => {
    setSelectedRunSession(appToView)
  }

  return {
    selectedRunSession,
    runHistory,
    saveRunSession,
    setRunHistory,
    viewRunSession
  };
};


export { RunItContext, RunItProvider, useRunIt };