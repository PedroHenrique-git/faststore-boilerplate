import { gql } from 'graphql-request';
import { ProductFragment } from '../fragments/ProductFragment';

export const ProductsQuery = gql`
  ${ProductFragment}

  query Products(
    $first: Int!
    $after: String
    $sort: StoreSort!
    $selectedFacets: [IStoreSelectedFacet!]!
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
      selectedFacets: $selectedFacets
    ) {
      products {
        pageInfo {
          totalCount
        }
        edges {
          node {
            ...Product
          }
        }
      }
    }
  }
`;
