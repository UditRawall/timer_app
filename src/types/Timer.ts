export type TimerStatus = "idle" | "running" | "paused" | "completed";

export type Timer = {
  id: string;
  name: string;
  duration: number;
  category: string;
  remainingTime: number;
  status: TimerStatus; 
  createdAt: number;
  completedAt?: number;
};
  
  export interface CompletedTimer extends Timer {
    completedAt: number;
  }
  
  export interface Category {
    name: string;
    color: string;
  }