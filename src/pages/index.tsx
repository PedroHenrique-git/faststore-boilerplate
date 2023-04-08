import { Box } from '@chakra-ui/react';
import { Carousel } from '@molecules/Carousel';
import { mockImages } from '@molecules/Carousel/mock-images';
import { GetStaticProps } from 'next';
import Cms from 'src/services/Cms';

function Home() {
  return (
    <Box>
      <Carousel images={mockImages} label="Banners home" />
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
