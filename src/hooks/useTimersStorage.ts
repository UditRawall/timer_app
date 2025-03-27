import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Timer, CompletedTimer } from '../types/Timer';

const ACTIVE_TIMERS_KEY = 'activeTimers';
const COMPLETED_TIMERS_KEY = 'completedTimers';

export const useTimerStorage = () => {
  const [activeTimers, setActiveTimers] = useState<Timer[]>([]);
  const [completedTimers, setCompletedTimers] = useState<CompletedTimer[]>([]);

  // Load timers from storage on initialization
  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    try {
      const storedActiveTimers = await AsyncStorage.getItem(ACTIVE_TIMERS_KEY);
      const storedCompletedTimers = await AsyncStorage.getItem(COMPLETED_TIMERS_KEY);

      if (storedActiveTimers) {
        setActiveTimers(JSON.parse(storedActiveTimers));
      }

      if (storedCompletedTimers) {
        setCompletedTimers(JSON.parse(storedCompletedTimers));
      }
    } catch (error) {
      console.error('Error loading timers', error);
    }
  };

  const saveActiveTimers = async (timers: Timer[]) => {
    try {
      await AsyncStorage.setItem(ACTIVE_TIMERS_KEY, JSON.stringify(timers));
      setActiveTimers(timers);
    } catch (error) {
      console.error('Error saving active timers', error);
    }
  };

  const saveCompletedTimers = async (timers: CompletedTimer[]) => {
    try {
      await AsyncStorage.setItem(COMPLETED_TIMERS_KEY, JSON.stringify(timers));
      setCompletedTimers(timers);
    } catch (error) {
      console.error('Error saving completed timers', error);
    }
  };

  return {
    activeTimers,
    completedTimers,
    saveActiveTimers,
    saveCompletedTimers,
    loadTimers,
  };
};