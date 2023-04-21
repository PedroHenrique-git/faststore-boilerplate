import { ProductsQuery, ProductsQueryVariables } from '@generated/graphql';
import { useQuery } from 'react-query';
import { ProductsQuery as ProductQueriesGql } from 'src/graphql/queries/ProductsQuery';
import { graphqlClient } from 'src/server/graphql';

interface Params {
  variables: ProductsQueryVariables;
  key: string;
}

export function useProductsQuery({ variables, key }: Params) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`products-query-${key}`, variables],
    queryFn: () => {
      return graphqlClient.request<
        ProductsQuery,
        Partial<ProductsQueryVariables>
      >(ProductQueriesGql, variables);
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
