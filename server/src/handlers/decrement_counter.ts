
import { type DecrementCounterInput, type Counter } from '../schema';

// In-memory counter storage (non-persistent)
let currentCount = 0;

export const getCurrentCount = (): number => {
  return currentCount;
};

export const setCurrentCount = (value: number): void => {
  currentCount = value;
};

export const decrementCounter = async (input: DecrementCounterInput): Promise<Counter> => {
  try {
    const currentValue = getCurrentCount();
    const newValue = currentValue - input.amount;
    setCurrentCount(newValue);
    
    return {
      value: newValue
    };
  } catch (error) {
    console.error('Counter decrement failed:', error);
    throw error;
  }
};
