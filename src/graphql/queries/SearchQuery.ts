import { gql } from 'graphql-request';
import { ProductSummaryFragment } from '../fragments/ProductSummaryFragment';

export const SearchQuery = gql`
  ${ProductSummaryFragment}

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
        ... on StoreFacetRange {
          key
          label
          min {
            absolute
            selected
          }
          max {
            absolute
            selected
          }
        }

        ... on StoreFacetBoolean {
          key
          label
          values {
            value
            label
            selected
            quantity
          }
        }

        __typename
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
