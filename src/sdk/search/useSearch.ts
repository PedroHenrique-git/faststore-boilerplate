import {
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from '@generated/graphql';
import { useQuery } from 'react-query';
import { SearchProduct } from 'src/graphql/queries/SearchProducts';
import { graphqlClient } from 'src/server/graphql';
import { useSearchHistory } from './useSearchHistory';

export const MAX_TOP_SEARCH_TERMS = 5;

export function useSearch(term: string) {
  const { add } = useSearchHistory();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['search', term],
    queryFn: () => {
      return graphqlClient.request<
        SearchProductsQuery,
        Partial<SearchProductsQueryVariables>
      >(SearchProduct, {
        first: MAX_TOP_SEARCH_TERMS,
        term,
        sort: 'price_desc',
      });
    },
    onSuccess: () => {
      if (term) {
        add({ value: term });
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
