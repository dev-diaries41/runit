import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSettings } from '@/providers/Settings';
import { Metrics } from '@/types';
import { Time } from '@/constants/globals';

export function useMetrics(distance: number, elapsedTime: number) {
  const { settings } = useSettings();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [metricsTimeSeries, setMetricsTimeSeries] = useState<Metrics[]>([]);
  const monitorInterval = 10 * Time.sec;

  useEffect(() => {
    const monitorMetrics = () => {
      try {
        const newMetrics = getMetrics(distance, elapsedTime);  
        setMetrics(newMetrics);
        setMetricsTimeSeries(prev => {
          const updatedSeries = [...prev, newMetrics];
          return updatedSeries.length > 120 ? updatedSeries.slice(1) : updatedSeries; // track most recent hour
        });
      } catch (error) {
        onMetricsError(error);
      }
    };
  
    const shouldMonitor = !isNaN(parseInt(settings.weight)) && elapsedTime > 0 && Math.round(elapsedTime) % monitorInterval === 0;
    
    if (shouldMonitor) {
      monitorMetrics();
    }
  }, [Math.floor(elapsedTime / monitorInterval), distance]); 
  

  const getMetrics = (distance: number, elapsedTime: number): Metrics => {
    const weight = parseInt(settings.weight);
    if (isNaN(weight)) throw new Error("Missing weight");
    
    const calories = calculateCalories(weight, distance);
    const pace = calculateAvgPace(distance, elapsedTime);
    
    return {
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

  const getCurrentMetrics = () => {
    try {
      const newMetrics = getMetrics(distance, elapsedTime);
      setMetrics(newMetrics);
    } catch (error) {
      onMetricsError(error);
    }
  };

  const resetMetrics = () => {
    setMetrics(null);
    setMetricsTimeSeries([]);
  };

  return { 
    metrics, 
    metricsTimeSeries,
    getCurrentMetrics, 
    resetMetrics ,
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
