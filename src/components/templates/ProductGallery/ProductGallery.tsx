import { Box, Heading, Text } from '@chakra-ui/react';
import {
  Filter_FacetsFragment,
  ProductSummary_ProductFragment,
} from '@generated/graphql';
import { Pagination } from '@molecules/Pagination';
import { ProductGrid } from '@organisms/ProductGrid';
import { SearchFilters } from '@organisms/SearchFilters';
import { useAtomValue } from 'jotai';
import { paginationAtom } from 'src/sdk/state';

interface Props {
  facets: Filter_FacetsFragment[];
  products: ProductSummary_ProductFragment[];
  term: string;
}

export const ProductGallery = ({ facets, products, term }: Props) => {
  const { totalProducts } = useAtomValue(paginationAtom);

  return (
    <>
      <Box as="section" marginTop={'3rem'}>
        <Heading
          as={'h1'}
          fontSize={'1.4em'}
          color={'gray.800'}
          fontWeight={'light'}
        >
          Showing results for:{' '}
          <Text as={'span'} fontWeight={'bold'}>
            {term}
          </Text>
        </Heading>
      </Box>

      <Box
        as={'section'}
        display={'grid'}
        gridTemplateRows={'repeat(2, auto)'}
        gridTemplateColumns={'.35fr 1fr'}
        rowGap={'1rem'}
        columnGap={'5'}
        marginTop={'2rem'}
      >
        <Box>
          <Heading
            as={'h3'}
            fontSize={'1em'}
            color={'gray.800'}
            fontWeight={'light'}
          >
            Filters
          </Heading>
        </Box>

        <Box>
          <Heading
            as={'h3'}
            fontSize={'1em'}
            color={'gray.800'}
            fontWeight={'light'}
          >
            {totalProducts} results
          </Heading>
        </Box>

        <SearchFilters
          filters={facets}
          display={{ base: 'none', lg: 'block' }}
          height={'fit-content'}
          position={'sticky'}
          top={'80px'}
        />

        <ProductGrid products={products} />

        <Pagination />
      </Box>
    </>
  );
};
