import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useSession } from '../session';
import { cartAtom } from '../state';
import { createStore } from '../store';
import {
  Cart,
  CartItem,
  getItemId,
  isGift,
  useValidationCart,
} from './useValidationCart';

const cartStore = createStore('fs::cart', { id: '', messages: [], items: [] });

export function useCart() {
  const { session } = useSession();
  const [cart, setCart] = useAtom(cartAtom);

  const { validate, isLoading } = useValidationCart();

  const inCart = useCallback(
    (itemId: string) => {
      return !!cart.items.find((i) => i.id === itemId);
    },
    [cart],
  );

  const getItem = useCallback(
    (itemId: string) => {
      return cart.items.find((i) => i.id === itemId);
    },
    [cart],
  );

  const updateItemQuantity = useCallback(
    async (newQuantity: number, itemId: string) => {
      const { set } = (await cartStore) ?? {};

      const newCart: Cart = {
        ...cart,
        items: cart.items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }

          return item;
        }),
      };

      // new states before validate
      setCart(newCart);
      set?.(newCart);

      validate(
        {
          cart: newCart,
          session,
        },
        {
          onSuccess(data) {
            if (data) {
              // new states after validate
              setCart(data);
              set?.(data);
            }
          },
        },
      );
    },
    [cart, session, setCart, validate],
  );

  const addToCart = useCallback(
    async (item: CartItem) => {
      const { set } = (await cartStore) ?? {};

      const itemWithId: CartItem = { ...item, id: getItemId(item) };

      const newCart: Cart = {
        ...cart,
        items: inCart(itemWithId.id)
          ? cart.items.map((item) => {
              if (item.id === itemWithId.id) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }

              return item;
            })
          : [...cart.items, itemWithId],
      };

      // new states before validate
      setCart(newCart);
      set?.(newCart);

      validate(
        {
          cart: newCart,
          session,
        },
        {
          onSuccess(data) {
            if (data) {
              // new states after validate
              setCart(data);
              set?.(data);
            }
          },
        },
      );
    },
    [cart, session, validate, setCart, inCart],
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      const { set } = (await cartStore) ?? {};

      const newCart: Cart = {
        ...cart,
        items: cart.items.filter((i) => i.id !== itemId),
      };

      // new states before validate
      setCart(newCart);
      set?.(newCart);

      validate(
        {
          cart: newCart,
          session,
        },
        {
          onSuccess(data) {
            if (data) {
              // new states after validate
              setCart(data);
              set?.(data);
            }
          },
        },
      );
    },
    [cart, session, validate, setCart],
  );

  return useMemo(
    () => ({
      cart: {
        ...cart,
        messages: cart.messages,
        gifts: cart.items.filter((item) => isGift(item)),
        items: cart.items.filter((item) => !isGift(item)),
        totalUniqueItems: cart.items.length,
        totalItems: cart.items.reduce(
          (acc, curr) => acc + (isGift(curr) ? 0 : curr.quantity),
          0,
        ),
        total: cart.items.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0,
        ),
        subTotal: cart.items.reduce(
          (acc, curr) => acc + curr.listPrice * curr.quantity,
          0,
        ),
      },
      addToCart,
      inCart,
      getItem,
      removeFromCart,
      updateItemQuantity,
      isValidating: isLoading,
    }),
    [
      cart,
      addToCart,
      inCart,
      getItem,
      removeFromCart,
      updateItemQuantity,
      isLoading,
    ],
  );
}
