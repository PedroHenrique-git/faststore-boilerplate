import { IStoreSelectedFacet, StoreSort } from '@generated/graphql';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSearch } from 'src/sdk/search/useSearch';

interface SearchParams {
  page: string;
  term: string;
  sort: StoreSort;
  selectedFacets: IStoreSelectedFacet[];
}

const useSearchParams = (): SearchParams => {
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
};

function Search() {
  const { selectedFacets, sort, term } = useSearchParams();

  const { data, isLoading } = useSearch({
    after: '0',
    first: 12,
    sort,
    term,
    selectedFacets,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>{JSON.stringify(data?.search.facets)}</div>
    </>
  );
}

export default Search;
