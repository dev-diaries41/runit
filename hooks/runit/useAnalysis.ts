import { Dimensions } from 'react-native';
import { useRunIt } from '@/providers/RunIt';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { formatTime } from '@/lib/helpers';

const { width } = Dimensions.get('window');

export function useAnalysis() {
  const { runHistory } = useRunIt();
  

    const labels = runHistory.map(runSession =>
      runSession.name.replace(/\/[^/]*$/, '').replace('run', '').trim()
    );
  
    const datasets: Dataset[] = [
      {
        data: runHistory.map(runSession => runSession.pace)
      }
    ];
  
    // Calculate dynamic maxLabels based on device width.
    const estimatedLabelWidth = 40; 
    const maxLabels = Math.max(Math.floor(width / estimatedLabelWidth), 5); // ensure at least 5 labels are displayed
    const step = Math.ceil(labels.length / maxLabels);
  
    // Always show the first and last labels for better context.
    const filteredLabels = labels.map((label, index) => {
      if (index === 0 || index === labels.length - 1) return label;
      return index % step === 0 ? label : '';
    });
  
    const averageDistance = runHistory.reduce((total, runSession) => total + runSession.distance , 0 ) / runHistory.length;
    const averagePace = runHistory.reduce((total, runSession) => total + runSession.pace , 0 ) / runHistory.length;
    const averageTime = runHistory.reduce((total, runSession) => total + runSession.time , 0 ) / runHistory.length;
    const averageCalories = runHistory.reduce((total, runSession) => total + runSession.calories , 0 ) / runHistory.length;

    const maxDistance = runHistory
    .map(session => session.distance)
    .filter(distance => !isNaN(distance))
    .sort((a, b) => b - a)[0];

    const maxPace = runHistory
      .map(session => session.pace)
      .filter(pace => !isNaN(pace))
      .sort((a, b) => b - a)[0];

    const maxTime = runHistory
      .map(session => session.time)
      .filter(time => !isNaN(time))
      .sort((a, b) => b - a)[0];

    const maxCalories = runHistory
      .map(session => session.calories)
      .filter(calories => !isNaN(calories))
      .sort((a, b) => b - a)[0];
    
  
    const metrics: {label: string; avg: number; max: number}[] = [
        { label: 'Distance (km)', avg: parseFloat(averageDistance.toFixed(2)), max: parseFloat(maxDistance.toFixed(2)) },
        { label: 'Pace (min/km)', avg: parseFloat(averagePace.toFixed(2)), max: parseFloat(maxPace.toFixed(2))},
        { label: 'Time (mm:ss)', avg: averageTime, max: maxTime },
        { label: 'Calories (kcal)', avg: Math.round(averageCalories), max: Math.round(maxCalories)  },
      ];


  return { 
    metrics,
    labels: filteredLabels,
    datasets
  };
}
