import { SearchQuery, SearchQueryVariables } from '@generated/graphql';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { SearchQuery as SearchQueryGql } from 'src/graphql/queries/SearchQuery';
import { graphqlClient } from 'src/server/graphql';
import { useIntelligentSearchEvent } from '../analytics/hooks/useIntelligentSearchEvent';
import { useSession } from '../session';

interface Params {
  variables: Partial<SearchQueryVariables>;
  onSuccess(_data: SearchQuery): void;
}

const useLocalizedVariables = ({
  after,
  first,
  selectedFacets,
  sort,
  term,
}: Partial<SearchQueryVariables>): SearchQueryVariables => {
  const {
    session: { locale, channel },
  } = useSession();

  return useMemo<SearchQueryVariables>(
    () => ({
      first: first ?? 5,
      after: after ?? '0',
      sort: sort ?? 'score_desc',
      selectedFacets: [
        { key: 'locale', value: locale ?? '' },
        { key: 'channel', value: channel ?? '' },
      ].concat(selectedFacets ?? []),
      term: term ?? '',
    }),
    [after, first, selectedFacets, sort, term, channel, locale],
  );
};

export function useSearch({ variables, onSuccess }: Params) {
  const { after, first, selectedFacets, sort, term } =
    useLocalizedVariables(variables);

  const {
    session: { locale },
  } = useSession();

  const { sendIntelligentSearchEvent } = useIntelligentSearchEvent();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`search`, after, first, selectedFacets, sort, term],
    queryFn: () => {
      return graphqlClient.request<SearchQuery, SearchQueryVariables>(
        SearchQueryGql,
        {
          after,
          first,
          selectedFacets,
          sort,
          term,
        },
      );
    },
    onSuccess(data) {
      if (data && term) {
        sendIntelligentSearchEvent({
          term,
          url: window.location.href,
          totalCount: data.search.products.pageInfo.totalCount,
          isTermMisspelled: data.search.metadata?.isTermMisspelled ?? false,
          logicalOperator: data.search.metadata?.logicalOperator ?? 'and',
          locale,
        });
      }

      onSuccess(data);
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
