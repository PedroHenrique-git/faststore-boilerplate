import { gql } from 'graphql-request';
import { CartProductItemFragment } from './CartProductItemFragment';

export const ProductDetailsFragment = gql`
  ${CartProductItemFragment}

  fragment ProductDetailsFragment_product on StoreProduct {
    id: productID
    sku
    name
    gtin
    description
    slug

    brand {
      brandName: name
    }

    isVariantOf {
      name
      productGroupID
      skuVariants {
        activeVariations
        slugsMap(dominantVariantName: "Color")
        availableVariations(dominantVariantName: "Color")
      }
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
        quantity
        listPrice
        seller {
          identifier
        }
      }
    }

    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }

    ...CartProductItem
  }
`;
