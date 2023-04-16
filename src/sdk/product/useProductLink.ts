import {
  ProductFragment,
  ProductSummary_ProductFragment,
} from '@generated/graphql';

export const useProductLink = (
  product: ProductFragment | ProductSummary_ProductFragment,
) => {
  const { slug } = product;

  return {
    href: `/${slug}/p`,
  };
};
