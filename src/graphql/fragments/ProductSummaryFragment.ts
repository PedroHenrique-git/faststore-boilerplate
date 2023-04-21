import { gql } from 'graphql-request';

export const ProductSummaryFragment = gql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku

    brand {
      brandName: name
    }

    name
    gtin

    isVariantOf {
      productGroupID
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      lowPrice
      offers {
        availability
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }

    additionalProperty {
      propertyID
      name
      value
      valueReference
    }
  }
`;
