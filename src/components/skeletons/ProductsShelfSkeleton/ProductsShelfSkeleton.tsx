import { defaultSplideProps } from '@organisms/ProductsShelf';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

export const ProductsShelfSkeleton = () => {
  return (
    <Splide {...defaultSplideProps}>
      {Array.from({ length: 5 }).map((index) => (
        <SplideSlide key={`product-skeleton-${index}`}>
          <ProductCardSkeleton />
        </SplideSlide>
      ))}
    </Splide>
  );
};
