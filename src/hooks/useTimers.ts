import { useState, useCallback } from 'react';
import { Timer, CompletedTimer, TimerStatus } from '../types/Timer';
import { useTimerStorage } from './useTimersStorage';
import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';

const { v4: uuidv4 } = require('uuid');

export const useTimers = () => {
  const { 
    activeTimers, 
    completedTimers, 
    saveActiveTimers, 
    saveCompletedTimers 
  } = useTimerStorage();

  const createTimer = useCallback((name: string, duration: number, category: string): Timer => {
    return {
      id: uuidv4(),
      name,
      duration,
      category,
      remainingTime: duration,
      status: "idle" as TimerStatus, 
      createdAt: Date.now(),
    };
  }, []);

  const addTimer = useCallback((timer: Timer) => {
    const updatedTimers = [...activeTimers, timer];
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);

  const startTimer = useCallback((timerId: string) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.id === timerId 
        ? { ...timer, status: "running" as TimerStatus } // ✅ Explicit cast
        : timer
    );
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);
  
  const pauseTimer = useCallback((timerId: string) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.id === timerId 
        ? { ...timer, status: "paused" as TimerStatus } // ✅ Explicit cast
        : timer
    );
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);

  const resetTimer = useCallback((timerId: string) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.id === timerId 
        ? { ...timer, remainingTime: timer.duration, status: 'idle' as TimerStatus } 
        : timer
    );
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);

  const updateTimerProgress = useCallback((timerId: string, remainingTime: number) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.id === timerId 
        ? { 
            ...timer, 
            remainingTime, 
            status: (remainingTime > 0 ? "running" : "completed") as TimerStatus // ✅ Explicitly cast
          } 
        : timer
    );

    const completedTimer = updatedTimers.find(
      timer => timer.id === timerId && timer.status === 'completed'
    );

    if (completedTimer) {
      const newCompletedTimer: CompletedTimer = {
        ...completedTimer,
        completedAt: Date.now(),
      };

      const filteredActiveTimers = updatedTimers.filter(timer => timer.id !== timerId);
      
      saveActiveTimers(filteredActiveTimers);
      saveCompletedTimers([...completedTimers, newCompletedTimer]);
    } else {
      saveActiveTimers(updatedTimers);
    }
  }, [activeTimers, completedTimers, saveActiveTimers, saveCompletedTimers]);

  const startCategoryTimers = useCallback((category: string) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.category === category 
        ? { ...timer, status: 'running' as TimerStatus} 
        : timer
    );
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);

  const pauseCategoryTimers = useCallback((category: string) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.category === category 
        ? { ...timer, status: 'paused' as TimerStatus } 
        : timer
    );
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);

  const resetCategoryTimers = useCallback((category: string) => {
    const updatedTimers = activeTimers.map(timer => 
      timer.category === category 
        ? { ...timer, remainingTime: timer.duration, status: 'idle' as TimerStatus} 
        : timer
    );
    saveActiveTimers(updatedTimers);
  }, [activeTimers, saveActiveTimers]);

  return {
    activeTimers,
    completedTimers,
    createTimer,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimerProgress,
    startCategoryTimers,
    pauseCategoryTimers,
    resetCategoryTimers,
  };
};