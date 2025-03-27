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
    <View className="bg-[#C68EFD] p-4 rounded-lg mb-3 shadow-md">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">{timer.name}</Text>
        <Text className={`${getStatusColor()} capitalize`}>
          {timer.status}
        </Text>
      </View>
      
      <View className="mb-5">
        <ProgressBar 
          current={timer.remainingTime} 
          total={timer.duration} 
        />
      </View>
      
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-xl font-semibold">
          {formatTime(timer.remainingTime)}
        </Text>
        
        <View className="flex flex-row space-x-2 ">
          {timer.status !== 'running' && (
            <TouchableOpacity 
              onPress={onStart} 
              className="bg-primary p-3 rounded-lg"
            >
              <Text className="text-white">Start</Text>
            </TouchableOpacity>
          )}
          
          {timer.status === 'running' && (
            <TouchableOpacity 
              onPress={onPause} 
              className="bg-primary p-3 rounded-lg"
            >
              <Text className="text-white">Pause</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            onPress={onReset} 
            className="bg-secondary p-3 rounded-lg border-red-500"
          >
            <Text className="text-black px-4">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};