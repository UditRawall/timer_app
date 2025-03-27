export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const padZero = (num: number) => num.toString().padStart(2, '0');
  
    return hours > 0
      ? `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`
      : `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  };
  
  export const calculatePercentage = (current: number, total: number): number => {
    return Math.max(0, Math.min(100, (current / total) * 100));
  };