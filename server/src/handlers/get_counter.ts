
import { type Counter } from '../schema';

// In-memory counter since it doesn't persist across sessions
let currentCount = 0;

export const getCounter = async (): Promise<Counter> => {
  return {
    value: currentCount
  };
};

// Helper function to get current count (used by other handlers)
export const getCurrentCount = (): number => {
  return currentCount;
};

// Helper function to set current count (used by other handlers)
export const setCurrentCount = (value: number): void => {
  currentCount = value;
};

// Helper function to reset counter (used in tests)
export const resetCounter = (): void => {
  currentCount = 0;
};
