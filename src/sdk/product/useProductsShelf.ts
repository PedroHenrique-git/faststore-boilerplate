import { ProductsQuery, ProductsQueryVariables } from '@generated/graphql';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { ProductsQuery as ProductQueriesGql } from 'src/graphql/queries/ProductsQuery';
import { graphqlClient } from 'src/server/graphql';
import { useSession } from '../session';

interface Params {
  variables: ProductsQueryVariables;
  key: string;
}

const useLocalizedVariables = ({
  after,
  first,
  selectedFacets,
  sort,
}: ProductsQueryVariables): ProductsQueryVariables => {
  const {
    session: { locale, channel },
  } = useSession();

  return useMemo<ProductsQueryVariables>(
    () => ({
      first: first ?? 5,
      after: after ?? '0',
      sort: sort ?? 'score_desc',
      selectedFacets: [
        { key: 'locale', value: locale ?? '' },
        { key: 'channel', value: channel ?? '' },
      ].concat(selectedFacets),
    }),
    [after, first, selectedFacets, sort, channel, locale],
  );
};

export function useProductsShelf({ variables, key }: Params) {
  const localizedVariables = useLocalizedVariables(variables);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`products-shelf-${key}`, variables],
    queryFn: () => {
      return graphqlClient.request<
        ProductsQuery,
        Partial<ProductsQueryVariables>
      >(ProductQueriesGql, localizedVariables);
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
