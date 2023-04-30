import { SimpleGrid } from '@chakra-ui/react';
import { ProductSummary_ProductFragment } from '@generated/graphql';
import ProductCard from '@molecules/ProductCard/ProductCard';

interface Props {
  products: ProductSummary_ProductFragment[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <SimpleGrid
      as={'section'}
      minChildWidth={'215px'}
      spacing="10px"
      gridArea={'product-grid'}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};
