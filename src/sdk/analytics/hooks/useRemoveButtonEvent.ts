import {
  CurrencyCode,
  RemoveFromCartEvent,
  sendAnalyticsEvent,
} from '@faststore/sdk';
import { useCallback } from 'react';
import { CartItem } from 'src/sdk/cart';
import { useSession } from 'src/sdk/session';
import { AnalyticsItem } from '../types';

export function useRemoveButtonEvent() {
  const {
    session: {
      currency: { code },
    },
  } = useSession();

  const sendRemoveButtonEvent = useCallback(
    (item: CartItem) => {
      sendAnalyticsEvent<RemoveFromCartEvent<AnalyticsItem>>({
        name: 'remove_from_cart',
        params: {
          currency: code as CurrencyCode,
          value: item.price * item.quantity, // TODO: In the future, we can explore more robust ways of calculating the value (gift items, discounts, etc.).
          items: [
            {
              item_id: item.itemOffered.isVariantOf.productGroupID,
              item_name: item.itemOffered.isVariantOf.name,
              item_brand: item.itemOffered.brand.name,
              item_variant: item.itemOffered.sku,
              quantity: item.quantity,
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

  return { sendRemoveButtonEvent };
}
