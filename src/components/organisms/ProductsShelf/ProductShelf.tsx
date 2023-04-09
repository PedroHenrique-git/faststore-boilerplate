import { Box, Heading } from '@chakra-ui/react';
import { ProductsQueryVariables } from '@generated/graphql';
import { ProductCard } from '@molecules/ProductCard';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { useProductsQuery } from 'src/sdk/product/useProductsQuery';

interface Props extends SplideProps {
  title: string;
  variables: ProductsQueryVariables;
}

const defaultSplideProps: SplideProps = {
  options: {
    type: 'loop',
    mediaQuery: 'max',
    perPage: 5,
    pagination: false,
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
        gap: 0,
      },
    },
  },
};

export const ProductShelf = ({ variables, title, ...splideProps }: Props) => {
  const { data } = useProductsQuery({ variables });

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
      <Splide {...defaultSplideProps} {...splideProps}>
        {data?.search?.products?.edges.map(({ node }) => (
          <SplideSlide key={node.name}>
            <ProductCard product={node} />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};
