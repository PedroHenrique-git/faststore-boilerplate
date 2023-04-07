import { gql } from 'graphql-request';

export const ProductFragment = gql`
  fragment ProductFragment on StoreProduct {
    slug
    name
    image {
      url
      alternateName
    }
    brand {
      name
    }
    description
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
