import { Button } from '@chakra-ui/react';
import { ProductSummary_ProductFragment } from '@generated/graphql';
import { useBuyButton } from 'src/sdk/cart/useBuyButton';

interface Props {
  product: ProductSummary_ProductFragment;
}

export const BuyButton = ({ product }: Props) => {
  const {
    id,
    sku,
    gtin,
    name: variantName,
    brand,
    isVariantOf,
    image: productImages,
    offers: {
      offers: [{ price, listPrice, seller }],
    },
    additionalProperty,
  } = product;

  const props = useBuyButton({
    id,
    price,
    listPrice,
    seller,
    quantity: 1,
    itemOffered: {
      sku,
      name: variantName,
      gtin,
      image: productImages,
      brand,
      isVariantOf,
      additionalProperty,
    },
  });

  return (
    <Button {...props} variant="solid" colorScheme="gray" w={'100%'}>
      Add to cart
    </Button>
  );
};
