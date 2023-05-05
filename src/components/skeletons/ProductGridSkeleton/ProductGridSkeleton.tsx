import { SimpleGrid } from '@chakra-ui/react';
import { DEFAULT_PER_PAGE } from 'src/sdk/constants';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

export const ProductGridSkeleton = () => {
  return (
    <SimpleGrid
      as={'section'}
      minChildWidth={'215px'}
      spacing="10px"
      gridArea={'product-grid'}
    >
      {Array.from({ length: DEFAULT_PER_PAGE }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </SimpleGrid>
  );
};
