import React from 'react';
import { Tabs } from 'expo-router';
import { Clock, Plus, History } from 'lucide-react-native';

export default function AppLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerStyle: { backgroundColor: '#f4f4f4' },
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#C68EFD',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: { 
          paddingBottom: 8, 
          height: 60 
        }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'My Timers',
          tabBarIcon: ({ color }) => <Clock color={color} size={24} />,
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{
          title: 'Create Timer',
          tabBarIcon: ({ color }) => <Plus color={color} size={24} />,
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{
          title: 'Timer History',
          tabBarIcon: ({ color }) => <History color={color} size={24} />,
        }} 
      />
    </Tabs>
  );
}