import { MouseEvent, useCallback } from 'react';
import { useCart } from './useCart';
import { CartItem } from './useValidationCart';

export function useBuyButton(item: CartItem | null) {
  const { addToCart } = useCart();

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      item && addToCart(item);
    },
    [item, addToCart],
  );

  return {
    onClick,
  };
}
