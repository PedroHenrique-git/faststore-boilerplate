import { gql } from 'graphql-request';

export const CartProductItemFragment = gql`
  fragment CartProductItem on StoreProduct {
    sku
    name

    image {
      url
      alternateName
    }

    brand {
      name
    }

    isVariantOf {
      productGroupID
      name
    }

    gtin

    additionalProperty {
      propertyID
      name
      value
      valueReference
    }
  }
`;
