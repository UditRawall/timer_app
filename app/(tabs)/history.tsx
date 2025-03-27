import React from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import { useTimers } from '../../src/hooks/useTimers';
import { formatTime } from '../../src/utils/formatTime';
import { CompletedTimer } from '../../src/types/Timer'; // Ensure this is correctly imported

export default function HistoryScreen() {
  const { completedTimers } = useTimers();

  // Explicitly type the function
  const renderHistoryItem: ListRenderItem<CompletedTimer> = ({ item }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-md flex-row justify-between">
      <View>
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-500">Category: {item.category}</Text>
      </View>
      <View className="items-end">
        <Text className="text-green-600">
          {new Date(item.completedAt).toLocaleString()}
        </Text>
        <Text className="text-gray-500">
          Duration: {formatTime(item.duration)}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {completedTimers.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-gray-500">No completed timers yet</Text>
        </View>
      ) : (
        <FlatList
          data={completedTimers}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
