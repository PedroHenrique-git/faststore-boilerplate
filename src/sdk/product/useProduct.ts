import {
  IStoreSelectedFacet,
  ProductPageQuery,
  ProductPageQueryVariables,
} from '@generated/graphql';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { ProductPageQuery as ProductPageQueryGql } from 'src/graphql/queries/ProductPageQuery';
import { graphqlClient } from 'src/server/graphql';
import { useSession } from '../session';

interface Params {
  productID: string;
}

const getProductByID = (locator: IStoreSelectedFacet[]) =>
  graphqlClient.request<ProductPageQuery, ProductPageQueryVariables>(
    ProductPageQueryGql,
    { locator },
  );

export function useProduct({ productID }: Params) {
  const {
    session: { channel, locale },
  } = useSession();

  const { locator } = useMemo<{ locator: IStoreSelectedFacet[] }>(
    () => ({
      locator: [
        { key: 'id', value: productID },
        { key: 'channel', value: channel ?? '' },
        { key: 'locale', value: locale ?? '' },
      ],
    }),
    [productID, channel, locale],
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: productID,
    queryFn: () => getProductByID(locator),
  });

  return {
    data,
    isError,
    isLoading,
  };
}
