import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { Clock, Plus, History } from 'lucide-react-native';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen 
       name='(tabs)'
       options={{
         headerShown: false,
       }}
      />
    </Stack>
  );
}