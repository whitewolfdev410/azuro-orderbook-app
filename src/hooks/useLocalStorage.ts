'use client';
import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: any = null
): {
  value: T;
  setValue: (value: T) => void;
  removeValue: (key: string) => void;
} {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item =
      typeof window !== 'undefined' && window?.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  const setValue = (value: T) => {
    if (value) {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue((prev) =>
        JSON.stringify(prev) !== JSON.stringify(value) ? value : prev
      );
    }
  };

  const removeValue = (key: string) => {
    window.localStorage.removeItem(key);
  };

  return { value: storedValue, setValue, removeValue };
}
