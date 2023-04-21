import { Box, Heading } from '@chakra-ui/react';
import { ProductsQueryVariables } from '@generated/graphql';
import ProductCard from '@molecules/ProductCard';
import { Slider } from '@molecules/Slider';
import { SplideProps } from '@splidejs/react-splide';
import { ProductsShelfSkeleton } from 'src/components/skeletons/ProductsShelfSkeleton';
import { useProductsQuery } from 'src/sdk/product/useProductsQuery';

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
  const { data, isError, isLoading } = useProductsQuery({
    variables,
    key: title,
  });

  const edges = data?.search?.products?.edges;

  const showSkeleton = isError || isLoading || !edges?.length;

  return (
    <Box as="section" margin={'25px 0'}>
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
          {edges?.map(({ node }) => (
            <ProductCard key={node.slug} product={node} />
          ))}
        </Slider>
      )}
    </Box>
  );
};
