import {
  SearchSuggestionsQuery,
  SearchSuggestionsQueryVariables,
} from '@generated/graphql';
import { useQuery } from 'react-query';
import { SearchProduct } from 'src/graphql/queries/SearchSuggestions';
import { graphqlClient } from 'src/server/graphql';
import { useSearchHistory } from './useSearchHistory';

export const MAX_TOP_SEARCH_TERMS = 5;

interface Params {
  term: string;
  clear?(): void;
}

export function useSuggestion({ term, clear }: Params) {
  const { add } = useSearchHistory();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['search-suggestions', term],
    queryFn: () => {
      return graphqlClient.request<
        SearchSuggestionsQuery,
        Partial<SearchSuggestionsQueryVariables>
      >(SearchProduct, {
        first: MAX_TOP_SEARCH_TERMS,
        term,
      });
    },
    onSuccess: () => {
      if (term) {
        add({ value: term });
        clear?.();
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