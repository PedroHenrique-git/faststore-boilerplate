import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { paginationAtom } from '../state';

function generatePages(totalPages: number) {
  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
}

export function usePagination() {
  const { asPath, pathname, push } = useRouter();
  const { totalPages, hasNextPage, hasPrevPage } = useAtomValue(paginationAtom);

  const { searchParams } = new URL(asPath, 'http://localhost');

  const currentPage = Number(searchParams.get('page') ?? '1');
  const currentStart = Number(searchParams.get('start') ?? '0');
  const currentEnd = Number(searchParams.get('end') ?? '5');

  const shouldDisablePrevButton = !hasPrevPage || currentPage === 1;
  const shouldDisableNextButton = !hasNextPage || currentPage === totalPages;

  const pages = generatePages(totalPages);
  const slicedPages = pages.slice(currentStart, currentEnd);
  const firstPage = slicedPages.at(0);
  const lastPage = slicedPages.at(-1);

  const changePage = useCallback(
    (value: number, slice?: { start: number; end: number }) => {
      searchParams.set('page', String(value));

      if (slice) {
        searchParams.set('start', String(slice.start));
        searchParams.set('end', String(slice.end));
      }

      push(asPath, `${pathname}?${searchParams.toString()}`);
    },
    [asPath, pathname, push, searchParams],
  );

  const clearPagination = useCallback((searchParams: URLSearchParams) => {
    searchParams.delete('page');
    searchParams.delete('start');
    searchParams.delete('end');
  }, []);

  return useMemo(
    () => ({
      changePage,
      clearPagination,
      currentPage,
      currentStart,
      currentEnd,
      shouldDisablePrevButton,
      shouldDisableNextButton,
      pages,
      slicedPages,
      firstPage,
      lastPage,
    }),
    [
      changePage,
      clearPagination,
      currentEnd,
      currentStart,
      currentPage,
      firstPage,
      lastPage,
      pages,
      slicedPages,
      shouldDisableNextButton,
      shouldDisablePrevButton,
    ],
  );
}
