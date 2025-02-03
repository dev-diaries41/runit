export function calculateCalories(weightKg: number, distanceKm: number): number {
    const caloriesBurned = weightKg * distanceKm;
    return Math.round(caloriesBurned);
  }
  
  // in minutes per km
  export function calculateAvgPace(distanceKm: number, timeInMs: number): number {
    if(distanceKm === 0) return 0;
    const timeMinutes = timeInMs / 60000;
    const avgPace = timeMinutes / distanceKm;
    return parseFloat(avgPace.toFixed(2));
  }
  
  export function formatTime(timeInMs: number): string{
    const minutes = String(Math.floor(timeInMs / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((timeInMs % 60000) / 1000)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  export function exerciseIdToName(id: string): string{
    const timestamp = parseInt(id.split('_')[0]);
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear())} Run`;  
  }
