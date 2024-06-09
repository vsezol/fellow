import { useRef } from 'react';

export const usePrevious = <T>(value: T, buffer = 1): T[] => {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T[]>([]);
  if (currentRef.current !== value) {
    previousRef.current.unshift(currentRef.current);
    previousRef.current = previousRef.current.slice(0, buffer);
    currentRef.current = value;
  }
  return previousRef.current;
};
