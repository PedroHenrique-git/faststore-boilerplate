import { Box } from '@chakra-ui/react';
import { Carousel, mockImages } from '@molecules/Carousel';
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
