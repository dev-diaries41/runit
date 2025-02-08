 export function formatTime(timeInMs: number): string{
    const minutes = String(Math.floor(timeInMs / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((timeInMs % 60000) / 1000)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }