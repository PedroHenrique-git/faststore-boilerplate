import {
  ShippingSimulationQuery,
  ShippingSimulationQueryVariables,
} from '@generated/graphql';
import { useQuery } from 'react-query';
import { ShippingQuery } from 'src/graphql/queries/ShippingQuery';
import { graphqlClient } from 'src/server/graphql';

export function useShipping({
  country,
  items,
  postalCode,
}: ShippingSimulationQueryVariables) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: postalCode,
    queryFn: () => {
      return graphqlClient.request<
        ShippingSimulationQuery,
        ShippingSimulationQueryVariables
      >(ShippingQuery, { country, items, postalCode });
    },
    enabled: false,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
}
