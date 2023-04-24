import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useFilter() {
  const { asPath, pathname, push } = useRouter();

  const { searchParams } = new URL(asPath, 'http://localhost');

  const addFilter = useCallback(
    (key: string, value: string) => {
      searchParams.append(key, value);

      push(asPath, `${pathname}?${searchParams.toString()}`);
    },
    [asPath, pathname, push, searchParams],
  );

  const removeFilter = useCallback(
    (value: string) => {
      const params = Array.from(searchParams.entries());

      const newParams = params
        .filter(([, v]) => v !== value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      push(asPath, `${pathname}?${newParams}`);
    },
    [asPath, pathname, push, searchParams],
  );

  const rangeFilter = useCallback(
    (key: string, value: string) => {
      searchParams.set(key, value);

      push(asPath, `${pathname}?${searchParams.toString()}`);
    },
    [asPath, pathname, push, searchParams],
  );

  return {
    addFilter,
    removeFilter,
    rangeFilter,
  };
}
