import { gql } from 'graphql-request';
import { StoreCollectionConnectionFragment } from '../fragments/StoreCollectionConnectionFragment';

export const getCollectionQuery = gql`
  ${StoreCollectionConnectionFragment}

  query getCollection($first: Int!, $after: String) {
    allCollections(first: $first, after: $after) {
      ...StoreCollectionConnectionFragment
    }
  }
`;
