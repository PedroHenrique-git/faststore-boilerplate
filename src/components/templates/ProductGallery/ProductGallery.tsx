import { Box, Heading, Text } from '@chakra-ui/react';
import {
  Filter_FacetsFragment,
  ProductSummary_ProductFragment,
} from '@generated/graphql';
import { Pagination } from '@molecules/Pagination';
import { Sort } from '@molecules/Sort';
import { ProductGrid } from '@organisms/ProductGrid';
import { SearchFilters } from '@organisms/SearchFilters';
import { FiltersSideBar } from '@organisms/SearchFilters/FiltersSideBar';
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
        gridTemplateRows={{
          base: 'repeat(4, auto)',
          lg: 'repeat(3, auto)',
        }}
        gridTemplateColumns={{
          base: '.50fr .50fr .50fr 1fr',
          lg: '.50fr .50fr 1fr',
        }}
        gridTemplateAreas={{
          base: `
            "head head sort sort"
            "head-total head-total head-total head-total"
            "product-grid product-grid product-grid product-grid"
            "pagination pagination pagination pagination"
          `,
          lg: `
            "head head-total sort"
            "filters product-grid product-grid"
            "filters pagination pagination"
          `,
        }}
        rowGap={'1rem'}
        columnGap={'5'}
        marginTop={'2rem'}
      >
        <Box as="section" gridArea={'head'} alignSelf={'center'}>
          <Heading
            as={'h3'}
            fontSize={'1em'}
            color={'gray.800'}
            fontWeight={'light'}
            display={{ base: 'none', lg: 'block' }}
          >
            Filters
          </Heading>

          <FiltersSideBar facets={facets} />
        </Box>

        <Box as="section" gridArea={'head-total'} alignSelf={'center'}>
          <Heading
            as={'h3'}
            fontSize={'1em'}
            color={'gray.800'}
            fontWeight={'light'}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            {totalProducts} results
          </Heading>
        </Box>

        <Box as="section" gridArea={'sort'} justifySelf={'flex-end'}>
          <Sort />
        </Box>

        <SearchFilters
          filters={facets}
          gridArea={'filters'}
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
