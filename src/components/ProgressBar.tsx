import React from 'react';
import { View } from 'react-native';
import { calculatePercentage } from '../utils/formatTime';

interface ProgressBarProps {
  current: number;
  total: number;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  height = 10,
  backgroundColor = '#E0E0E0',
  fillColor = '#4CAF50'
}) => {
  const percentage = calculatePercentage(current, total);

  return (
    <View 
      className="w-full rounded-full overflow-hidden"
      style={{ 
        height, 
        backgroundColor 
      }}
    >
      <View 
        className="h-full rounded-full" 
        style={{ 
          width: `${percentage}%`, 
          backgroundColor: fillColor 
        }} 
      />
    </View>
  );
};