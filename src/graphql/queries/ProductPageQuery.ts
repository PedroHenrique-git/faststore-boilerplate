import { gql } from 'graphql-request';
import { ProductDetailsFragment } from '../fragments/ProductDetailsFragment';

export const ProductPageQuery = gql`
  ${ProductDetailsFragment}

  query ProductPage($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductDetailsFragment_product
    }
  }
`;
