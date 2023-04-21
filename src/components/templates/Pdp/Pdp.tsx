import { Box } from '@chakra-ui/react';
import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { Breadcrumb } from '@molecules/Breadcrumb';
import { ProductImages } from '@molecules/ProductImages';

interface Props {
  product: ProductDetailsFragment_ProductFragment;
}

export const Pdp = ({ product }: Props) => {
  return (
    <>
      <Breadcrumb items={product.breadcrumbList.itemListElement} />

      <Box>
        <ProductImages images={product.image} />
      </Box>
    </>
  );
};
