import { gql } from 'graphql-request';
import { ProductFragment } from './ProductFragment';

export const SuggestionsFragment = gql`
  ${ProductFragment}

  fragment Suggestions on StoreSuggestions {
    terms {
      value
    }
    products {
      ...Product
    }
  }
`;
