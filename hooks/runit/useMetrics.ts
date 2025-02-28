import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useSettings } from '@/providers/Settings';
import { RunSession, Metrics } from '@/types';
import { Time } from '@/constants/globals';

export function useMetrics(distance: number, elapsedTime: number) {
  const { settings } = useSettings();
  const [runSession, setRunSession] = useState<RunSession | null>(null);
  const [metricsTimeSeries, setMetricsTimeSeries] = useState<Metrics[]>([]);
  const idRef = useRef<string|null>(null);

  const monitorInterval = 30 * Time.sec;

  // useEffect(() => {
  //   const monitorMetrics = () => {
  //     try {
  //       const newMetrics = getRunSession(distance, elapsedTime);  
  //       setRunSession(newMetrics);
  //       setMetricsTimeSeries(prev => {
  //         const updatedSeries = [...prev, newMetrics];
  //         return updatedSeries.length > 120 ? updatedSeries.slice(1) : updatedSeries; // track most recent hour
  //       });
  //     } catch (error) {
  //       onMetricsError(error);
  //     }
  //   };
  
  //   const shouldMonitor = !isNaN(parseInt(settings.weight)) && elapsedTime > 0 && Math.round(elapsedTime) % monitorInterval === 0;
    
  //   if (shouldMonitor) {
  //     monitorMetrics();
  //   }
  // }, [Math.floor(elapsedTime / monitorInterval), distance]); 
  
  const  exerciseIdToName = (id: string): string => {
    const timestamp = parseInt(id.split('_')[0]);
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear())} Run`;  
  }

  const getRunSession = (distance: number, elapsedTime: number): RunSession => {
    const weight = parseInt(settings.weight);
    if (isNaN(weight)) throw new Error("Missing weight");
    
    if(!idRef.current){
      idRef.current = `${Date.now()}_run`;
    }

    const name = exerciseIdToName(idRef.current)
    const calories = calculateCalories(weight, distance);
    const pace = calculateAvgPace(distance, elapsedTime);

    return {
      id:idRef.current,
      name,
      calories, 
      pace, 
      distance: parseFloat(distance.toFixed(2)), 
      time: elapsedTime
    };
  };


  const onMetricsError = (error: unknown) => {
    if (error instanceof Error && error.message === "Missing weight") {
      Alert.alert("Missing weight", "Add your weight in settings");
    } else {
      Alert.alert("Unknown error", "There was an issue calculating metrics. Please try again.");
    }
  };

  const updateRunSession = () => {
    try {
      const newMetrics = getRunSession(distance, elapsedTime);
      setRunSession(newMetrics);
    } catch (error) {
      onMetricsError(error);
    }
  };

  const resetRunSession = () => {
    idRef.current = null;
    setRunSession(null);
    setMetricsTimeSeries([]);
  };

  return { 
    runSession, 
    metricsTimeSeries,
    updateRunSession, 
    resetRunSession ,
  };
}

function calculateAvgPace(distanceKm: number, timeInMs: number): number {
  if (distanceKm === 0) return 0;
  const timeMinutes = timeInMs / 60000;
  const avgPace = timeMinutes / distanceKm;
  return parseFloat(avgPace.toFixed(2));
}
  
function calculateCalories(weightKg: number, distanceKm: number): number {
  const caloriesBurned = weightKg * distanceKm;
  return Math.round(caloriesBurned);
}
