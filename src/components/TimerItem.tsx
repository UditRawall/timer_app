import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Timer } from '../types/Timer';
import { formatTime } from '../utils/formatTime';
import { ProgressBar } from './ProgressBar';

interface TimerItemProps {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const TimerItem: React.FC<TimerItemProps> = ({ 
  timer, 
  onStart, 
  onPause, 
  onReset 
}) => {
  const getStatusColor = () => {
    switch (timer.status) {
      case 'running': return 'text-green-600';
      case 'paused': return 'text-yellow-600';
      case 'completed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <View className="bg-white p-4 rounded-lg mb-3 shadow-md">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">{timer.name}</Text>
        <Text className={`${getStatusColor()} capitalize`}>
          {timer.status}
        </Text>
      </View>
      
      <View className="mb-3">
        <ProgressBar 
          current={timer.remainingTime} 
          total={timer.duration} 
        />
      </View>
      
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-semibold">
          {formatTime(timer.remainingTime)}
        </Text>
        
        <View className="flex-row space-x-2">
          {timer.status !== 'running' && (
            <TouchableOpacity 
              onPress={onStart} 
              className="bg-green-500 px-3 py-2 rounded"
            >
              <Text className="text-black">Start</Text>
            </TouchableOpacity>
          )}
          
          {timer.status === 'running' && (
            <TouchableOpacity 
              onPress={onPause} 
              className="bg-yellow-500 px-3 py-2 rounded"
            >
              <Text className="text-black">Pause</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            onPress={onReset} 
            className="bg-gray-300 px-3 py-2 rounded"
          >
            <Text className="text-black">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};