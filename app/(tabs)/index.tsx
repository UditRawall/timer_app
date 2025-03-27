import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  AppState,
  TouchableOpacity,
} from "react-native";
import { useTimers } from "../../src/hooks/useTimers";
import { CategoryGroup } from "../../src/components/CategoryGroup";
import { CompletionModal } from "../../src/components/CompletionModal";
import { DEFAULT_CATEGORIES } from "../../src/constant/categories";
import { Timer } from "@/src/types/Timer";
import "../globals.css";
import { Link } from "expo-router";

export default function HomeScreen() {
  const {
    activeTimers,
    startTimer,
    pauseTimer,
    resetTimer,
    startCategoryTimers,
    pauseCategoryTimers,
    resetCategoryTimers,
    updateTimerProgress,
  } = useTimers();

  const [completedTimerName, setCompletedTimerName] = useState<string | null>(
    null
  );

  // Timer tick logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const handleTimerTick = () => {
      activeTimers.forEach((timer) => {
        if (timer.status === "running" && timer.remainingTime > 0) {
          updateTimerProgress(timer.id, timer.remainingTime - 1);
        } else if (timer.remainingTime === 0 && timer.status !== "completed") {
          setCompletedTimerName(timer.name);
        }
      });
    };

    // Start interval if any timer is running
    if (activeTimers.some((timer) => timer.status === "running")) {
      intervalId = setInterval(handleTimerTick, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeTimers]);

  // Group timers by category
  const groupedTimers = activeTimers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {} as Record<string, Timer[]>);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {activeTimers.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-gray-500 text-center">
            OOPS ! No timers created. Add a new timer to get started!
          </Text>
          <TouchableOpacity
            className="bg-primary p-4 rounded-lg items-center mt-4"
            // onPress={handleCreateTimer}
          >
            <Link href='/(tabs)/create'><Text className="text-white text-lg font-bold">Create Timer</Text></Link>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView>
          {Object.entries(groupedTimers).map(([category, timers]) => (
            <CategoryGroup
              key={category}
              category={category}
              timers={timers}
              onStartCategory={() => startCategoryTimers(category)}
              onPauseCategory={() => pauseCategoryTimers(category)}
              onResetCategory={() => resetCategoryTimers(category)}
              onStartTimer={startTimer}
              onPauseTimer={pauseTimer}
              onResetTimer={resetTimer}
            />
          ))}
        </ScrollView>
      )}

      <CompletionModal
        visible={!!completedTimerName}
        timerName={completedTimerName || ""}
        onClose={() => setCompletedTimerName(null)}
      />
    </View>
  );
}
