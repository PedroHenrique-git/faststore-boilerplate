import {
  CurrencyCode,
  ViewItemEvent,
  sendAnalyticsEvent,
} from '@faststore/sdk';
import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { useEffect } from 'react';
import { useSession } from 'src/sdk/session';
import { AnalyticsItem } from '../types';

interface Params {
  product: ProductDetailsFragment_ProductFragment;
}

export function useProductDetailsEvent({ product }: Params) {
  const {
    session: { currency },
  } = useSession();

  const {
    sku,
    gtin,
    name: variantName,
    brand,
    isVariantOf,
    offers: {
      offers: [{ price, listPrice }],
    },
  } = product;

  useEffect(() => {
    sendAnalyticsEvent<ViewItemEvent<AnalyticsItem>>({
      name: 'view_item',
      params: {
        currency: currency.code as CurrencyCode,
        value: price,
        items: [
          {
            item_id: isVariantOf.productGroupID,
            item_name: isVariantOf.name,
            item_brand: brand.name,
            item_variant: sku,
            price,
            discount: listPrice - price,
            currency: currency.code as CurrencyCode,
            item_variant_name: variantName,
            product_reference_id: gtin,
          },
        ],
      },
    });
  }, [
    isVariantOf.productGroupID,
    isVariantOf.name,
    brand.name,
    sku,
    price,
    listPrice,
    currency.code,
    variantName,
    gtin,
  ]);
}
