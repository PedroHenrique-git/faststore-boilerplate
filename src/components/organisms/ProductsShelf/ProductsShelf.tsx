import { Box, Heading } from '@chakra-ui/react';
import { ProductsQueryVariables } from '@generated/graphql';
import ProductCard from '@molecules/ProductCard';
import { Slider } from '@molecules/Slider';
import { SplideProps } from '@splidejs/react-splide';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductsShelfSkeleton } from 'src/components/skeletons/ProductsShelfSkeleton';
import { useViewItemListEvent } from 'src/sdk/analytics/hooks/useViewItemListEvent';
import { useProductsShelf } from 'src/sdk/product/useProductsShelf';

interface Props extends SplideProps {
  title: string;
  variables: ProductsQueryVariables;
}

export const defaultSplideProps: SplideProps = {
  options: {
    mediaQuery: 'max',
    perPage: 5,
    pagination: false,
    padding: '10px',
    gap: '15px',
    breakpoints: {
      1200: {
        perPage: 3,
      },
      992: {
        perPage: 2,
      },
      640: {
        perPage: 1,
        padding: { right: 90 },
      },
    },
  },
};

export const ProductsShelf = ({ variables, title, ...splideProps }: Props) => {
  const viewedOnce = useRef(false);
  const { ref, inView } = useInView();

  const { data, isError, isLoading } = useProductsShelf({
    variables,
    key: title,
  });

  const edges = data?.search?.products?.edges;

  const showSkeleton = isError || isLoading || !edges?.length;

  const { sendViewItemListEvent } = useViewItemListEvent({
    products: edges ?? [],
    title,
    page: 0,
    pageSize: 0,
  });

  useEffect(() => {
    if (inView && !viewedOnce.current && edges?.length) {
      sendViewItemListEvent();

      viewedOnce.current = true;
    }
  }, [inView, edges?.length, sendViewItemListEvent]);

  return (
    <Box as="section" margin={'25px 0'} ref={ref} data-testid="product-shelf">
      <Heading
        color={'blackAlpha.700'}
        fontSize={'2xl'}
        fontWeight={'bold'}
        marginBottom={'5'}
      >
        {title}
      </Heading>
      {showSkeleton ? (
        <ProductsShelfSkeleton />
      ) : (
        <Slider splideProps={{ ...defaultSplideProps, ...splideProps }}>
          {edges?.map(({ node }, index) => (
            <ProductCard key={node.slug} product={node} index={index} />
          ))}
        </Slider>
      )}
    </Box>
  );
};
