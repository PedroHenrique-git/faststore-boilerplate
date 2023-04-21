import { gql } from 'graphql-request';
import { CartProductItemFragment } from './CartProductItemFragment';

export const CartItemFragment = gql`
  ${CartProductItemFragment}

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
`;
