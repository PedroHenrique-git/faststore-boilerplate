import { gql } from 'graphql-request';
import { ProductFragment } from './ProductFragment';

export const SuggestionsFragment = gql`
  ${ProductFragment}

  fragment SuggestionsFragment on StoreSuggestions {
    terms {
      value
    }
    products {
      ...ProductFragment
    }
  }
`;
