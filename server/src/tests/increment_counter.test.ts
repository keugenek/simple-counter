
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { type IncrementCounterInput } from '../schema';
import { incrementCounter, getCurrentCount, setCurrentCount } from '../handlers/increment_counter';

// Test input with default amount
const testInputDefault: IncrementCounterInput = {
  amount: 1
};

// Test input with custom amount
const testInputCustom: IncrementCounterInput = {
  amount: 5
};

describe('incrementCounter', () => {
  beforeEach(() => {
    // Reset counter to 0 before each test
    setCurrentCount(0);
  });

  afterEach(() => {
    // Clean up after each test
    setCurrentCount(0);
  });

  it('should increment counter by default amount (1)', async () => {
    const result = await incrementCounter(testInputDefault);

    expect(result.value).toEqual(1);
    expect(getCurrentCount()).toEqual(1);
  });

  it('should increment counter by custom amount', async () => {
    const result = await incrementCounter(testInputCustom);

    expect(result.value).toEqual(5);
    expect(getCurrentCount()).toEqual(5);
  });

  it('should increment counter from existing value', async () => {
    // Set initial value
    setCurrentCount(10);

    const result = await incrementCounter(testInputCustom);

    expect(result.value).toEqual(15);
    expect(getCurrentCount()).toEqual(15);
  });

  it('should handle multiple increments', async () => {
    // First increment
    await incrementCounter(testInputDefault);
    expect(getCurrentCount()).toEqual(1);

    // Second increment
    await incrementCounter(testInputCustom);
    expect(getCurrentCount()).toEqual(6);

    // Third increment
    const result = await incrementCounter({ amount: 3 });
    expect(result.value).toEqual(9);
    expect(getCurrentCount()).toEqual(9);
  });

  it('should handle large increment values', async () => {
    const largeInput: IncrementCounterInput = {
      amount: 1000
    };

    const result = await incrementCounter(largeInput);

    expect(result.value).toEqual(1000);
    expect(getCurrentCount()).toEqual(1000);
  });
});
