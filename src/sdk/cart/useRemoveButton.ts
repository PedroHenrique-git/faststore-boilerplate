import { MouseEvent, useCallback } from 'react';
import { useRemoveButtonEvent } from '../analytics/hooks/useRemoveButtonEvent';
import { useCart } from './useCart';
import { CartItem } from './useValidationCart';

export function useRemoveButton(item: CartItem) {
  const { removeFromCart, isMutating } = useCart();

  const { sendRemoveButtonEvent } = useRemoveButtonEvent();

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      sendRemoveButtonEvent(item);

      item && removeFromCart(item.id);
    },
    [item, removeFromCart, sendRemoveButtonEvent],
  );

  return {
    onClick,
    disabled: isMutating,
  };
}
