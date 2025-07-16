
import { type ResetCounterInput, type Counter } from '../schema';

// In-memory counter storage
let currentCount = 0;

export const resetCounter = async (input: ResetCounterInput): Promise<Counter> => {
  try {
    // Reset the counter to the specified value (default 0)
    currentCount = input.value;
    
    return {
      value: currentCount
    };
  } catch (error) {
    console.error('Counter reset failed:', error);
    throw error;
  }
};

// Helper function to get current count (for testing and other handlers)
export const getCurrentCount = (): number => {
  return currentCount;
};

// Helper function to set current count (for testing and other handlers)
export const setCurrentCount = (value: number): void => {
  currentCount = value;
};
