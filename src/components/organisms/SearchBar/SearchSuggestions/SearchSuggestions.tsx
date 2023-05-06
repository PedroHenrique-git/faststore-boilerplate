import { Box, Heading, List } from '@chakra-ui/react';
import { ProductFragment } from '@generated/graphql';
import { SearchProductCart } from '../SearchProductCard/SearchProductCard';

interface Props {
  products: ProductFragment[];
}

export const SearchSuggestions = ({ products = [] }: Props) => {
  if (!products.length) {
    return (
      <Box
        width={'100%'}
        fontSize={'medium'}
        color={'blackAlpha.700'}
        textAlign={'center'}
      >
        No products found
      </Box>
    );
  }

  return (
    <>
      <Heading
        fontSize={'medium'}
        color={'blackAlpha.700'}
        lineHeight={'initial'}
      >
        Suggested Products
      </Heading>
      <List paddingTop={'16px'}>
        {products.map((product, index) => (
          <SearchProductCart
            product={product}
            key={product.name}
            index={index}
          />
        ))}
      </List>
    </>
  );
};
