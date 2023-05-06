import { gql } from 'graphql-request';

export const ProductFragment = gql`
  fragment Product on StoreProduct {
    slug
    name
    sku
    gtin

    image {
      url
      alternateName
    }

    brand {
      name
    }

    description

    isVariantOf {
      productGroupID
      name
    }

    offers {
      highPrice
      lowPrice
      offerCount
      priceCurrency
      offers {
        listPrice
        sellingPrice
        priceCurrency
        price
        priceValidUntil
        itemCondition
        availability
        seller {
          identifier
        }
      }
    }
  }
`;
