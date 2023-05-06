import {
  CurrencyCode,
  SelectItemEvent,
  sendAnalyticsEvent,
} from '@faststore/sdk';
import {
  ProductFragment,
  ProductSummary_ProductFragment,
} from '@generated/graphql';
import { useCallback } from 'react';
import { useSession } from 'src/sdk/session';
import { AnalyticsItem, SearchSelectItemEvent } from '../types';

interface Params {
  product: ProductFragment | ProductSummary_ProductFragment;
  selectedOffer: number;
  index: number;
}

export function useProductLinkEvent() {
  const {
    session: {
      currency: { code },
    },
  } = useSession();

  const sendProductLinkEvent = useCallback(
    ({ index, product, selectedOffer }: Params) => {
      sendAnalyticsEvent<SelectItemEvent<AnalyticsItem>>({
        name: 'select_item',
        params: {
          items: [
            {
              item_id: product.isVariantOf.productGroupID,
              item_name: product.isVariantOf.name,
              item_brand: product.brand.name,
              item_variant: product.sku,
              index,
              price: product.offers.offers[selectedOffer].price,
              discount:
                product.offers.offers[selectedOffer].listPrice -
                product.offers.offers[selectedOffer].price,
              currency: code as CurrencyCode,
              item_variant_name: product.name,
              product_reference_id: product.gtin,
            },
          ],
        },
      });

      sendAnalyticsEvent<SearchSelectItemEvent>({
        name: 'search_select_item',
        params: {
          url: window.location.href,
          items: [
            {
              item_id: product.isVariantOf.productGroupID,
              item_variant: product.sku,
              index,
            },
          ],
        },
      });
    },
    [code],
  );

  return { sendProductLinkEvent };
}
