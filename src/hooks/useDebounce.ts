import { useCallback, useEffect, useRef } from 'react';

const useDebounce = () => {
  const timeoutRef = useRef<number | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Memoized debounce function
  const debounce = useCallback(
    <T extends (...args: any[]) => any>(
      func: T,
      delay: number
    ): ((...args: Parameters<T>) => void) => {
      return (...args: Parameters<T>) => {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Set new timeout
        timeoutRef.current = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  return debounce;
};

export default useDebounce;