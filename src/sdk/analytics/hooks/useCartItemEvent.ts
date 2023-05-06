import {
  AddToCartEvent,
  CurrencyCode,
  RemoveFromCartEvent,
  sendAnalyticsEvent,
} from '@faststore/sdk';
import { useCallback, useMemo } from 'react';
import { CartItem } from 'src/sdk/cart';
import { useSession } from 'src/sdk/session';
import { AnalyticsItem } from '../types';

export function useCartItemEvent() {
  const {
    session: {
      currency: { code },
    },
  } = useSession();

  const sendCartItemEvent = useCallback(
    (item: CartItem, quantity: number) => {
      const quantityDelta = quantity - item.quantity;

      return sendAnalyticsEvent<
        AddToCartEvent<AnalyticsItem> | RemoveFromCartEvent<AnalyticsItem>
      >({
        name: quantityDelta > 0 ? 'add_to_cart' : 'remove_from_cart',
        params: {
          currency: code as CurrencyCode,
          value: item.price * Math.abs(quantityDelta),
          items: [
            {
              item_id: item.itemOffered.isVariantOf.productGroupID,
              item_name: item.itemOffered.isVariantOf.name,
              item_brand: item.itemOffered.brand.name,
              item_variant: item.itemOffered.sku,
              quantity: Math.abs(quantityDelta),
              price: item.price,
              discount: item.listPrice - item.price,
              currency: code as CurrencyCode,
              item_variant_name: item.itemOffered.name,
              product_reference_id: item.itemOffered.gtin,
            },
          ],
        },
      });
    },
    [code],
  );

  return useMemo(() => ({ sendCartItemEvent }), [sendCartItemEvent]);
}
