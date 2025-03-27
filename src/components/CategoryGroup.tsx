import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Timer } from '../types/Timer';
import { TimerItem } from './TimerItem';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

interface CategoryGroupProps {
  category: string;
  timers: Timer[];
  onStartCategory: () => void;
  onPauseCategory: () => void;
  onResetCategory: () => void;
  onStartTimer: (id: string) => void;
  onPauseTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
}

export const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  timers,
  onStartCategory,
  onPauseCategory,
  onResetCategory,
  onStartTimer,
  onPauseTimer,
  onResetTimer
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View className="mb-4 bg-white rounded-lg shadow-md">
      <TouchableOpacity 
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row justify-between items-center p-4 bg-gray-100 rounded-t-lg"
      >
        <View className="flex-row items-center space-x-2">
          <Text className="text-xl font-bold">{category}</Text>
          <Text className="text-gray-500">({timers.length} timers)</Text>
        </View>
        
        <View className="flex-row space-x-2">
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              onStartCategory();
            }}
            className="bg-green-500 px-3 py-1 rounded"
          >
            <Text className="text-black">Start All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              onPauseCategory();
            }}
            className="bg-yellow-500 px-3 py-1 rounded"
          >
            <Text className="text-red-600">Pause All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              onResetCategory();
            }}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            <Text>Reset All</Text>
          </TouchableOpacity>
          
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </View>
      </TouchableOpacity>
      
      {isExpanded && (
        <View className="p-2">
          {timers.map((timer) => (
            <TimerItem
              key={timer.id}
              timer={timer}
              onStart={() => onStartTimer(timer.id)}
              onPause={() => onPauseTimer(timer.id)}
              onReset={() => onResetTimer(timer.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
};