import { gql } from 'graphql-request';
import { ProductDetailsFragment } from './ProductDetailsFragment';

export const ProductPageFragment = gql`
  ${ProductDetailsFragment}

  fragment ProductPageQuery on StoreProduct {
    id: productID

    seo {
      title
      description
      canonical
    }

    brand {
      name
    }

    sku
    gtin
    name
    description
    releaseDate

    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }

    image {
      url
      alternateName
    }

    offers {
      lowPrice
      highPrice
      priceCurrency
      offers {
        availability
        price
        priceValidUntil
        priceCurrency
        itemCondition
        seller {
          identifier
        }
      }
    }

    isVariantOf {
      productGroupID
    }

    ...ProductDetailsFragment_product
  }
`;
