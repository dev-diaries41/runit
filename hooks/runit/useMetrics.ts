import { useState } from 'react';
import { Alert } from 'react-native';
import { useSettings } from '@/providers/Settings';
import { Metrics } from '@/types';

export function useMetrics(distance: number, elapsedTime: number) {
  const { settings } = useSettings();
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const computeMetrics = () => {
    const weight = parseInt(settings.weight);
    if (isNaN(weight)) {
      Alert.alert("Missing weight", "Add your weight in settings");
      return;
    }
    const calories = calculateCalories(weight, distance);
    const pace = calculateAvgPace(distance, elapsedTime);
    
    setMetrics({
      calories, 
      pace, 
      distance: parseFloat(distance.toFixed(2)), 
      time: elapsedTime
    });
  };

  const resetMetrics = () => {
    setMetrics(null);
  };

  return { metrics, computeMetrics, resetMetrics };
}

function calculateAvgPace(distanceKm: number, timeInMs: number): number {
    if(distanceKm === 0) return 0;
    const timeMinutes = timeInMs / 60000;
    const avgPace = timeMinutes / distanceKm;
    return parseFloat(avgPace.toFixed(2));
}
  
function calculateCalories(weightKg: number, distanceKm: number): number {
    const caloriesBurned = weightKg * distanceKm;
    return Math.round(caloriesBurned);
}