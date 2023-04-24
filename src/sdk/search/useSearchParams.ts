import { IStoreSelectedFacet, StoreSort } from '@generated/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface SearchParams {
  page: string;
  term: string;
  sort: StoreSort;
  selectedFacets: IStoreSelectedFacet[];
}

export function useSearchParams(): SearchParams {
  const { asPath } = useRouter();

  const { searchParams } = new URL(asPath, 'http://localhost');

  const page = searchParams.get('page');
  const sort = searchParams.get('sort');
  const term = searchParams.get('term');

  searchParams.delete('page');
  searchParams.delete('sort');
  searchParams.delete('term');

  const selectedFacets = Array.from(searchParams.entries()).map(
    ([key, value]) => ({
      key,
      value,
    }),
  );

  return useMemo(
    () => ({
      page: page ?? '1',
      sort: (sort ?? 'score_desc') as StoreSort,
      term: term ?? '',
      selectedFacets,
    }),
    [sort, term, page, selectedFacets],
  );
}
