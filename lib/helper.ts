export const delayedFunction = (callback: Function, duration: number) =>{
    setTimeout(callback, duration);
}

export const formatTimeElapsed = (timestamp: number) => {
  const currentTime = Date.now();
  const diffMs = currentTime - timestamp; // difference between current time and provided timestamp

  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor((diffMs / (1000 * 60 * 60 * 24)));

  let result = '';

  if (days >= 7) {
    result += `${Math.floor(days / 7)}w`; // w for weeks
  } else if (days > 0) {
    result += `${days}d`;
  } else if (hours > 0) {
    result += `${hours}h`;
  } else if (minutes > 0) {
    result += `${minutes}m`;
  } else {
    result += `${seconds}s`;
  }

  return result;
};
