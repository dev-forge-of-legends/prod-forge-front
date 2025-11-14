import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when clicking outside the referenced element
 * @param callback - Function to call when clicking outside
 * @returns ref - Ref to attach to the element you want to detect outside clicks for
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  callback: () => void
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};
