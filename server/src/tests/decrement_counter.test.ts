
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type DecrementCounterInput } from '../schema';
import { decrementCounter, getCurrentCount, setCurrentCount } from '../handlers/decrement_counter';

describe('decrementCounter', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should decrement counter by default amount of 1', async () => {
    // Set initial counter value
    setCurrentCount(10);
    
    const input: DecrementCounterInput = {
      amount: 1
    };
    
    const result = await decrementCounter(input);
    
    expect(result.value).toEqual(9);
    expect(getCurrentCount()).toEqual(9);
  });

  it('should decrement counter by specified amount', async () => {
    // Set initial counter value
    setCurrentCount(100);
    
    const input: DecrementCounterInput = {
      amount: 25
    };
    
    const result = await decrementCounter(input);
    
    expect(result.value).toEqual(75);
    expect(getCurrentCount()).toEqual(75);
  });

  it('should handle decrementing to negative values', async () => {
    // Set initial counter value
    setCurrentCount(5);
    
    const input: DecrementCounterInput = {
      amount: 10
    };
    
    const result = await decrementCounter(input);
    
    expect(result.value).toEqual(-5);
    expect(getCurrentCount()).toEqual(-5);
  });

  it('should decrement from zero', async () => {
    // Set initial counter value to zero
    setCurrentCount(0);
    
    const input: DecrementCounterInput = {
      amount: 3
    };
    
    const result = await decrementCounter(input);
    
    expect(result.value).toEqual(-3);
    expect(getCurrentCount()).toEqual(-3);
  });

  it('should handle large decrement amounts', async () => {
    // Set initial counter value
    setCurrentCount(1000);
    
    const input: DecrementCounterInput = {
      amount: 999
    };
    
    const result = await decrementCounter(input);
    
    expect(result.value).toEqual(1);
    expect(getCurrentCount()).toEqual(1);
  });
});
