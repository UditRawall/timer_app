import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTimers } from '../../src/hooks/useTimers';
import { DEFAULT_CATEGORIES } from '../../src/constant/categories';

export default function CreateTimerScreen() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0].name);

  const { createTimer, addTimer } = useTimers();

  const handleCreateTimer = () => {
    // Validate inputs
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a timer name');
      return;
    }

    const durationSeconds = parseInt(duration, 10);
    if (isNaN(durationSeconds) || durationSeconds <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid duration in seconds');
      return;
    }

    // Create and add timer
    const newTimer = createTimer(name, durationSeconds, category);
    addTimer(newTimer);

    // Reset form
    setName('');
    setDuration('');
    setCategory(DEFAULT_CATEGORIES[0].name);

    Alert.alert('Success', 'Timer created successfully!');
  };

  return (
    <ScrollView 
      className="flex-1 bg-gray-100 p-4"
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Timer Name</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-3 text-base"
          placeholder="Enter timer name (e.g., Workout, Study)"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Duration (seconds)</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-lg p-3 text-base"
          placeholder="Enter duration in seconds"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
      </View>

      <View className="mb-4">
        <Text className="text-lg font-bold mb-2">Category</Text>
        <View className="bg-white border border-gray-300 rounded-lg">
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {DEFAULT_CATEGORIES.map((cat) => (
              <Picker.Item 
                key={cat.name} 
                label={cat.name} 
                value={cat.name} 
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        className="bg-primary p-4 rounded-lg items-center"
        onPress={handleCreateTimer}
      >
        <Text className="text-white text-lg font-bold">Create Timer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}