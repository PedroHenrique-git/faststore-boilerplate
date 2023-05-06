import {
  CurrencyCode,
  ViewCartEvent,
  sendAnalyticsEvent,
} from '@faststore/sdk';
import { useCallback, useEffect } from 'react';
import { CartItem } from 'src/sdk/cart';
import { useSession } from 'src/sdk/session';

interface Params {
  total: number;
  items: CartItem[];
  cartOpen: boolean;
}

export function useViewCartEvent({ items, total, cartOpen }: Params) {
  const {
    session: { currency },
  } = useSession();

  const viewCart = useCallback(() => {
    sendAnalyticsEvent<ViewCartEvent>({
      name: 'view_cart',
      params: {
        currency: currency.code as CurrencyCode,
        value: total,
        items: items.map((item) => ({
          item_id: item.itemOffered.isVariantOf.productGroupID,
          item_name: item.itemOffered.isVariantOf.name,
          item_brand: item.itemOffered.brand.name,
          item_variant: item.itemOffered.sku,
          quantity: item.quantity,
          price: item.price,
          discount: item.listPrice - item.price,
          currency: currency.code as CurrencyCode,
          item_variant_name: item.itemOffered.name,
          product_reference_id: item.itemOffered.gtin,
        })),
      },
    });
  }, [currency.code, total, items]);

  useEffect(() => {
    if (cartOpen) {
      viewCart();
    }
  }, [cartOpen, viewCart]);
}
