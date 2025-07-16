
import { type IncrementCounterInput, type Counter } from '../schema';

// Simple in-memory counter storage
let currentCount = 0;

export const getCurrentCount = (): number => {
  return currentCount;
};

export const setCurrentCount = (value: number): void => {
  currentCount = value;
};

export const incrementCounter = async (input: IncrementCounterInput): Promise<Counter> => {
  try {
    const currentValue = getCurrentCount();
    const newValue = currentValue + input.amount;
    setCurrentCount(newValue);
    
    return {
      value: newValue
    };
  } catch (error) {
    console.error('Counter increment failed:', error);
    throw error;
  }
};
