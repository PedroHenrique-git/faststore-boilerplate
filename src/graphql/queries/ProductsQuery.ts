import { gql } from 'graphql-request';
import { ProductSummary } from '../fragments/ProductSummary';

export const ProductsQuery = gql`
  ${ProductSummary}

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
            ...ProductSummary_product
          }
        }
      }
    }
  }
`;
