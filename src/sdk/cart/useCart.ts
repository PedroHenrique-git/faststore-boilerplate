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

  const addToCart = useCallback(
    async (item: CartItem) => {
      const { set } = (await cartStore) ?? {};

      const itemWithId: CartItem = { ...item, id: getItemId(item) };

      const newCart: Cart = {
        ...cart,
      };

      newCart.items.push(itemWithId);

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

  const inCart = useCallback(
    (itemId: string) => {
      return !!cart.items.find((i) => i.id === itemId);
    },
    [cart],
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
      removeFromCart,
      isValidating: isLoading,
    }),
    [cart, addToCart, inCart, removeFromCart, isLoading],
  );
}
