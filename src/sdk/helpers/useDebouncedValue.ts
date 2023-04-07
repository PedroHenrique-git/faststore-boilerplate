import { useState } from 'react';
import { useDebounce } from 'react-use';

export function useDebouncedValue<T = unknown>(initialValue: T, delay = 1000) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useDebounce(
    () => {
      setDebouncedValue(value);
    },
    delay,
    [value],
  );

  return {
    value,
    setValue,
    debouncedValue,
  };
}
