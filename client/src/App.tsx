
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import { useState, useEffect, useCallback } from 'react';
import type { Counter } from '../../server/src/schema';

function App() {
  const [counter, setCounter] = useState<Counter>({ value: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Load initial counter value
  const loadCounter = useCallback(async () => {
    try {
      const result = await trpc.getCounter.query();
      setCounter(result);
    } catch (error) {
      console.error('Failed to load counter:', error);
    }
  }, []);

  useEffect(() => {
    loadCounter();
  }, [loadCounter]);

  const handleIncrement = async () => {
    setIsLoading(true);
    try {
      const result = await trpc.incrementCounter.mutate({ amount: 1 });
      setCounter(result);
    } catch (error) {
      console.error('Failed to increment counter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    setIsLoading(true);
    try {
      const result = await trpc.decrementCounter.mutate({ amount: 1 });
      setCounter(result);
    } catch (error) {
      console.error('Failed to decrement counter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            🔢 Counter App
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Counter Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {counter.value}
            </div>
            <p className="text-gray-600">Current Count</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleDecrement}
              disabled={isLoading}
              variant="outline"
              size="lg"
              className="flex-1 text-lg font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            >
              ➖ Decrement
            </Button>
            <Button
              onClick={handleIncrement}
              disabled={isLoading}
              size="lg"
              className="flex-1 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
            >
              ➕ Increment
            </Button>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
              <span className="ml-2">Updating...</span>
            </div>
          )}

          {/* Info text */}
          <div className="text-center text-sm text-gray-500">
            💡 Counter resets when the server restarts
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
