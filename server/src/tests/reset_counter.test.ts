
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type ResetCounterInput } from '../schema';
import { resetCounter, getCurrentCount, setCurrentCount } from '../handlers/reset_counter';

describe('resetCounter', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should reset counter to default value 0', async () => {
    // Set counter to some non-zero value first
    setCurrentCount(42);
    
    const input: ResetCounterInput = {
      value: 0
    };
    const result = await resetCounter(input);

    expect(result.value).toEqual(0);
    expect(getCurrentCount()).toEqual(0);
  });

  it('should reset counter to specified value', async () => {
    // Set counter to some initial value
    setCurrentCount(100);
    
    const input: ResetCounterInput = {
      value: 25
    };
    const result = await resetCounter(input);

    expect(result.value).toEqual(25);
    expect(getCurrentCount()).toEqual(25);
  });

  it('should reset counter to negative value', async () => {
    // Set counter to positive value first
    setCurrentCount(50);
    
    const input: ResetCounterInput = {
      value: -10
    };
    const result = await resetCounter(input);

    expect(result.value).toEqual(-10);
    expect(getCurrentCount()).toEqual(-10);
  });

  it('should reset counter to zero from negative value', async () => {
    // Set counter to negative value first
    setCurrentCount(-20);
    
    const input: ResetCounterInput = {
      value: 0
    };
    const result = await resetCounter(input);

    expect(result.value).toEqual(0);
    expect(getCurrentCount()).toEqual(0);
  });

  it('should handle large values', async () => {
    const input: ResetCounterInput = {
      value: 1000000
    };
    const result = await resetCounter(input);

    expect(result.value).toEqual(1000000);
    expect(getCurrentCount()).toEqual(1000000);
  });
});
