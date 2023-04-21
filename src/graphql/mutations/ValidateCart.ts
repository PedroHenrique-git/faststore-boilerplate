import { gql } from 'graphql-request';
import { CartItemFragment } from '../fragments/CartItemFragment';
import { CartMessageFragment } from '../fragments/CartMessageFragment';

export const ValidateCart = gql`
  ${CartMessageFragment}
  ${CartItemFragment}

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
`;
