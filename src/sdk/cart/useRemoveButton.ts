import { MouseEvent, useCallback } from 'react';
import { useCart } from './useCart';

export function useRemoveButton(itemId: string | null) {
  const { removeFromCart, isMutating } = useCart();

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      itemId && removeFromCart(itemId);
    },
    [itemId, removeFromCart],
  );

  return {
    onClick,
    disabled: isMutating,
  };
}
