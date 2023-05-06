import {
  ProductFragment,
  ProductSummary_ProductFragment,
} from '@generated/graphql';
import { useProductLinkEvent } from '../analytics/hooks/useProductLinkEvent';

interface Params {
  product: ProductFragment | ProductSummary_ProductFragment;
  selectedOffer: number;
  index: number;
}

export const useProductLink = ({ index, product, selectedOffer }: Params) => {
  const { slug } = product;
  const { sendProductLinkEvent } = useProductLinkEvent();

  return {
    href: `/${slug}/p`,
    onClick: () => sendProductLinkEvent({ product, selectedOffer, index }),
  };
};
