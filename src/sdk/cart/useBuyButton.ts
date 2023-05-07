import { MouseEvent, useCallback } from 'react';
import { useBuyButtonEvent } from '../analytics/hooks/useBuyButtonEvent';
import { useCart } from './useCart';
import { CartItem } from './useValidationCart';

export function useBuyButton(item: CartItem | null) {
  const { addToCart, isMutating } = useCart();

  const { sendBuyButtonEvent } = useBuyButtonEvent();

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      item && sendBuyButtonEvent(item);

      item && addToCart(item);
    },
    [item, addToCart, sendBuyButtonEvent],
  );

  return {
    onClick,
    'data-testid': 'buy-button',
    disabled: isMutating,
  };
}
