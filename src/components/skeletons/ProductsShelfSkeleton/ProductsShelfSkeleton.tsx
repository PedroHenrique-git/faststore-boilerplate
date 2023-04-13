import { Slider } from '@molecules/Slider';
import { defaultSplideProps } from '@organisms/ProductsShelf';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

export const ProductsShelfSkeleton = () => {
  return (
    <Slider {...defaultSplideProps}>
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductCardSkeleton key={`product-card-skeleton-${index}`} />
      ))}
    </Slider>
  );
};
