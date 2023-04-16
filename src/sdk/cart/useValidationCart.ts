import { Cart as SDKCart, CartItem as SDKCartItem } from '@faststore/sdk';
import {
  CartItemFragment,
  CartMessageFragment,
  IStoreOffer,
  IStoreSession,
  ValidateCartMutation,
  ValidateCartMutationVariables,
} from '@generated/graphql';
import { useMutation } from 'react-query';
import { ValidateCart } from 'src/graphql/mutations/ValidateCart';
import { graphqlClient } from 'src/server/graphql';

export interface CartItem extends SDKCartItem, CartItemFragment {}

export interface Cart extends SDKCart<CartItem> {
  messages?: CartMessageFragment[];
}

interface ValidateCartParams {
  cart: Cart;
  session: IStoreSession;
}

export const isGift = (item: CartItem) => item.price === 0;

export const getItemId = (
  item: Pick<CartItem, 'itemOffered' | 'seller' | 'price'>,
) =>
  [
    item.itemOffered.sku,
    item.seller.identifier,
    item.itemOffered.additionalProperty
      ?.map(({ propertyID }) => propertyID)
      .join('-'),
  ]
    .filter(Boolean)
    .join('::');

export const validateCart = async (cart: Cart, session: IStoreSession) => {
  const data = await graphqlClient.request<
    ValidateCartMutation,
    ValidateCartMutationVariables
  >(ValidateCart, {
    cart: {
      order: {
        orderNumber: cart.id,
        acceptedOffer: cart.items.map(
          ({
            price,
            listPrice,
            seller,
            quantity,
            itemOffered,
          }): IStoreOffer => ({
            price,
            listPrice,
            seller,
            quantity,
            itemOffered: {
              sku: itemOffered.sku,
              image: itemOffered.image,
              name: itemOffered.name,
              additionalProperty: itemOffered.additionalProperty,
            },
          }),
        ),
      },
    },
    session,
  });

  return (
    data?.validateCart && {
      id: data.validateCart.order.orderNumber ?? '',
      messages: data.validateCart.messages ?? [],
      items: data.validateCart.order.acceptedOffer.map((item) => ({
        ...item,
        id: getItemId(item),
      })),
    }
  );
};

export function useValidationCart() {
  const { mutate, data, isError, isLoading } = useMutation({
    mutationKey: 'cart',
    mutationFn: ({ cart, session }: ValidateCartParams) =>
      validateCart(cart, session),
  });

  return {
    cart: data,
    isError,
    isLoading,
    validate: mutate,
  };
}
