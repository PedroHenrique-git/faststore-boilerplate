import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { usePagination } from './usePagination';

export function useFilter() {
  const { asPath, pathname, push, query } = useRouter();
  const { clearPagination } = usePagination();

  const { searchParams } = new URL(asPath, 'http://localhost');

  const { slug } = query;
  const path = slug ? (Array.isArray(slug) ? slug.join('/') : slug) : pathname;

  const addFilter = useCallback(
    (key: string, value: string) => {
      clearPagination(searchParams);

      searchParams.append(key, value);

      push(asPath, `${path}?${searchParams.toString()}`);
    },
    [asPath, path, push, clearPagination, searchParams],
  );

  const removeFilter = useCallback(
    (value: string) => {
      clearPagination(searchParams);

      const params = Array.from(searchParams.entries());

      const newParams = params
        .filter(([, v]) => v !== value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      push(asPath, `${path}?${newParams}`);
    },
    [asPath, path, push, clearPagination, searchParams],
  );

  const rangeFilter = useCallback(
    (key: string, value: string) => {
      clearPagination(searchParams);

      searchParams.set(key, value);

      push(asPath, `${path}?${searchParams.toString()}`);
    },
    [asPath, path, push, clearPagination, searchParams],
  );

  const changeSort = useCallback(
    (value: string) => {
      clearPagination(searchParams);

      searchParams.set('sort', value);

      push(asPath, `${path}?${searchParams.toString()}`);
    },
    [asPath, path, push, clearPagination, searchParams],
  );

  const clearFilters = useCallback(() => {
    const term = searchParams.get('term');

    push(asPath, `${path}?term=${term}`);
  }, [asPath, path, searchParams, push]);

  return {
    addFilter,
    removeFilter,
    rangeFilter,
    clearFilters,
    changeSort,
  };
}
