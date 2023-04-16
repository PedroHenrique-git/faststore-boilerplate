import { gql } from 'graphql-request';

export const ValidateCart = gql`
  mutation ValidateCart($cart: IStoreCart!, $session: IStoreSession!) {
    validateCart(cart: $cart, session: $session) {
      order {
        orderNumber
        acceptedOffer {
          ...CartItem
        }
      }
      messages {
        ...CartMessage
      }
    }
  }

  fragment CartMessage on StoreCartMessage {
    text
    status
  }

  fragment CartItem on StoreOffer {
    seller {
      identifier
    }

    quantity
    price
    listPrice

    itemOffered {
      ...CartProductItem
    }
  }

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
