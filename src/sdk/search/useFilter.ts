import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { usePagination } from './usePagination';

export function useFilter() {
  const { asPath, pathname, push } = useRouter();
  const { clearPagination } = usePagination();

  const { searchParams } = new URL(asPath, 'http://localhost');

  const addFilter = useCallback(
    (key: string, value: string) => {
      clearPagination(searchParams);

      searchParams.append(key, value);

      push(asPath, `${pathname}?${searchParams.toString()}`);
    },
    [asPath, pathname, push, clearPagination, searchParams],
  );

  const removeFilter = useCallback(
    (value: string) => {
      clearPagination(searchParams);

      const params = Array.from(searchParams.entries());

      const newParams = params
        .filter(([, v]) => v !== value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      push(asPath, `${pathname}?${newParams}`);
    },
    [asPath, pathname, push, clearPagination, searchParams],
  );

  const rangeFilter = useCallback(
    (key: string, value: string) => {
      clearPagination(searchParams);

      searchParams.set(key, value);

      push(asPath, `${pathname}?${searchParams.toString()}`);
    },
    [asPath, pathname, push, clearPagination, searchParams],
  );

  return {
    addFilter,
    removeFilter,
    rangeFilter,
  };
}
