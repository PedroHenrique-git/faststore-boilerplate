import { Box, Skeleton } from '@chakra-ui/react';
import { ProductGridSkeleton } from '../ProductGridSkeleton';

export const ProductGallerySkeleton = () => {
  return (
    <>
      <Box as="section" marginTop={'3rem'}>
        <Skeleton w={'min(100%, 300px)'} h={'26px'} />
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
          <Skeleton w={'min(100%, 100px)'} h={'26px'} />
        </Box>

        <Box as="section" gridArea={'head-total'} alignSelf={'center'}>
          <Skeleton w={'min(100%, 100px)'} h={'26px'} />
        </Box>

        <Box
          as="section"
          gridArea={'sort'}
          display={'flex'}
          justifyContent={'flex-end'}
        >
          <Skeleton w={'min(100%, 150px)'} h={'26px'} />
        </Box>

        <Box
          gridArea={'filters'}
          display={{ base: 'none', lg: 'block' }}
          height={'fit-content'}
          position={'sticky'}
          top={'80px'}
        >
          <Skeleton w={'min(100%, 200px)'} h={'26px'} marginBottom={'3'} />
          <Skeleton w={'min(100%, 200px)'} h={'26px'} marginBottom={'3'} />
          <Skeleton w={'min(100%, 200px)'} h={'26px'} marginBottom={'3'} />
          <Skeleton w={'min(100%, 200px)'} h={'26px'} marginBottom={'3'} />
        </Box>

        <ProductGridSkeleton />

        <Box gridArea={'pagination'}>
          <Skeleton w={'min(100%, 300px)'} h={'26px'} marginBottom={'3'} />
        </Box>
      </Box>
    </>
  );
};
