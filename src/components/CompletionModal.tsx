import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface CompletionModalProps {
  visible: boolean;
  timerName: string;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  visible,
  timerName,
  onClose
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg items-center w-[80%]">
          <Text className="text-2xl font-bold mb-4 text-center">
            Congratulations! 🎉
          </Text>
          
          <Text className="text-lg mb-6 text-center">
            Your timer "{timerName}" has completed successfully!
          </Text>
          
          <TouchableOpacity 
            onPress={onClose} 
            className="bg-blue-500 px-6 py-3 rounded"
          >
            <Text className="text-white text-lg">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};