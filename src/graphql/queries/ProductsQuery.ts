import { gql } from 'graphql-request';
import { ProductSummaryFragment } from '../fragments/ProductSummaryFragment';

export const ProductsQuery = gql`
  ${ProductSummaryFragment}

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
