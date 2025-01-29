export function calculateCalories(weightKg: number, distanceKm: number): number {
    const caloriesBurned = weightKg * distanceKm;
    return Math.round(caloriesBurned);
  }
  
  // in minutes per km
  export function calculateAvgPace(distanceKm: number, timeSeconds: number): number {
    if(distanceKm === 0) return 0;
    const timeMinutes = timeSeconds / 60;
    const avgPace = timeMinutes / distanceKm;
    return parseFloat(avgPace.toFixed(2));
  }
  
  export function formatTime(elapsedTime: number): string{
    const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }