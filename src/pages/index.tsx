import { Box } from '@chakra-ui/react';
import { Carousel, mockImages } from '@molecules/Carousel';
import { ProductShelf } from '@organisms/ProductsShelf';
import { GetStaticProps } from 'next';
import Cms from 'src/services/cms/Cms';

function Home() {
  return (
    <Box>
      <Carousel
        images={mockImages}
        label="Banners home"
        options={{
          type: 'loop',
          autoplay: true,
        }}
      />

      <ProductShelf
        title="Shelf one"
        variables={{
          first: 5,
          after: '0',
          sort: 'score_desc',
          selectedFacets: [{ key: 'productClusterIds', value: '140' }],
        }}
      />

      <ProductShelf
        title="Shelf one"
        variables={{
          first: 5,
          after: '0',
          sort: 'score_desc',
          selectedFacets: [{ key: 'productClusterIds', value: '140' }],
        }}
      />

      <ProductShelf
        title="Shelf one"
        variables={{
          first: 5,
          after: '0',
          sort: 'score_desc',
          selectedFacets: [{ key: 'productClusterIds', value: '140' }],
        }}
      />

      <ProductShelf
        title="Shelf one"
        variables={{
          first: 5,
          after: '0',
          sort: 'score_desc',
          selectedFacets: [{ key: 'productClusterIds', value: '140' }],
        }}
      />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cmsHome = await Cms.getCmsPage(
    'page',
    'bd9e01c6-534e-4e54-aa76-f864dcbad024',
  );

  return {
    props: {
      cmsHome,
    },
  };
};

export default Home;
