
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { getCounter, getCurrentCount, setCurrentCount, resetCounter } from '../handlers/get_counter';

describe('getCounter', () => {
  beforeEach(() => {
    createDB();
    resetCounter(); // Reset counter state before each test
  });
  
  afterEach(resetDB);

  it('should return initial counter value of 0', async () => {
    const result = await getCounter();
    
    expect(result.value).toEqual(0);
    expect(typeof result.value).toBe('number');
  });

  it('should return current counter value', async () => {
    // Set counter to a specific value
    setCurrentCount(42);
    
    const result = await getCounter();
    
    expect(result.value).toEqual(42);
  });

  it('should return updated counter value after changes', async () => {
    // Initial value
    let result = await getCounter();
    expect(result.value).toEqual(0);
    
    // Update counter
    setCurrentCount(100);
    result = await getCounter();
    expect(result.value).toEqual(100);
    
    // Update again
    setCurrentCount(-25);
    result = await getCounter();
    expect(result.value).toEqual(-25);
  });

  it('should work with helper functions', () => {
    // Test getCurrentCount helper
    expect(getCurrentCount()).toEqual(0);
    
    // Test setCurrentCount helper
    setCurrentCount(999);
    expect(getCurrentCount()).toEqual(999);
  });
});
