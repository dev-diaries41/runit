import { createContext, useState, useContext, ReactNode } from 'react';
import { ExcerciseHistory } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RunItContextProps {
  selectedExceriseResults: ExcerciseHistory | null;
  setSelectedExceriseResults: React.Dispatch<React.SetStateAction< ExcerciseHistory | null>>; 
  exerciseHistory: ExcerciseHistory[];
  setExerciseHistory: React.Dispatch<React.SetStateAction< ExcerciseHistory[]>>; 
}

const RunItContext = createContext<RunItContextProps | undefined>(undefined);

interface RunItProviderProps {
  children: ReactNode;
  storedExcerciseHistory: ExcerciseHistory[]
}

const RunItProvider = ({ children, storedExcerciseHistory }: RunItProviderProps) => {
  const [selectedExceriseResults, setSelectedExceriseResults] = useState<ExcerciseHistory | null>(null);
  const [exerciseHistory, setExerciseHistory] = useState<ExcerciseHistory[]>(storedExcerciseHistory);

  return (
    <RunItContext.Provider value={{
      selectedExceriseResults, 
      setSelectedExceriseResults,
      exerciseHistory, 
      setExerciseHistory,
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
  const {selectedExceriseResults, setSelectedExceriseResults, exerciseHistory, setExerciseHistory} = context;


  const saveExerciseResults = async(result: ExcerciseHistory) => {
    try {
        setExerciseHistory(prev => [...prev, result])
        await AsyncStorage.setItem(result.id, JSON.stringify(result));     
    } catch (error) {
      console.error('Error saving exercise metrics');
    }
  }


  const viewExceriseResults = (appToView: ExcerciseHistory) => {
    setSelectedExceriseResults(appToView)
  }

  return {
    selectedExceriseResults,
    exerciseHistory,
    saveExerciseResults,
    setExerciseHistory,
    viewExceriseResults
  };
};


export { RunItContext, RunItProvider, useRunIt };