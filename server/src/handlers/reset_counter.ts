
import { type ResetCounterInput, type Counter } from '../schema';
import { setCurrentCount } from './get_counter';

export const resetCounter = async (input: ResetCounterInput): Promise<Counter> => {
  // This is a placeholder declaration! Real code should be implemented here.
  // The goal of this handler is resetting the counter to the specified value (default 0).
  // Since the counter doesn't persist across sessions, we use in-memory storage.
  
  setCurrentCount(input.value);
  
  return {
    value: input.value
  };
};
