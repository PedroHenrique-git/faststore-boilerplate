import { gql } from 'graphql-request';
import { SuggestionsFragment } from '../fragments/SuggestionsFragment';

export const SearchProduct = gql`
  ${SuggestionsFragment}

  query searchProducts(
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
      suggestions {
        ...Suggestions
      }
    }
  }
`;
