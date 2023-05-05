import { gql } from 'graphql-request';
import { FilterFacetsFragment } from '../fragments/FilterFacetsFragment';
import { ProductSummaryFragment } from '../fragments/ProductSummaryFragment';

export const SearchQuery = gql`
  ${ProductSummaryFragment}
  ${FilterFacetsFragment}

  query Search(
    $first: Int!
    $after: String
    $sort: StoreSort
    $term: String
    $selectedFacets: [IStoreSelectedFacet!]
  ) {
    search(
      first: $first
      after: $after
      sort: $sort
      term: $term
      selectedFacets: $selectedFacets
    ) {
      facets {
        ...Filter_facets
      }
      metadata {
        isTermMisspelled
        logicalOperator
      }
      products {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
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
