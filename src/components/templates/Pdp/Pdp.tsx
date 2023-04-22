import { Box } from '@chakra-ui/react';
import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { Breadcrumb } from '@molecules/Breadcrumb';
import { ProductDetails } from '@molecules/ProductDetails';
import { ProductImages } from '@molecules/ProductImages';
import { CmsPage } from '@services/cms/types';
import { RenderCmsSections } from 'src/components/cms';

interface Props {
  product: ProductDetailsFragment_ProductFragment;
  cmsPdp: CmsPage | null;
}

export const Pdp = ({ product, cmsPdp }: Props) => {
  return (
    <>
      <Breadcrumb items={product.breadcrumbList.itemListElement} />

      <Box
        as={'section'}
        display={{ base: 'flex', lg: 'grid' }}
        gap={'8'}
        flexDirection={{ base: 'column' }}
        gridTemplateColumns={{ base: '1fr .6fr' }}
        columnGap={'8'}
        marginBottom={'28'}
      >
        <ProductImages images={product.image} />
        <ProductDetails product={product} />
      </Box>

      <RenderCmsSections
        sections={cmsPdp?.sections ?? null}
        context={product}
      />
    </>
  );
};
