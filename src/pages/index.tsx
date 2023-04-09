import { Box } from '@chakra-ui/react';
import { Carousel, mockImages } from '@molecules/Carousel';
import { GetStaticProps } from 'next';
import { RenderCmsSections } from 'src/components/cms';
import Cms from 'src/services/cms/Cms';
import { CmsPage } from 'src/services/cms/types';

interface Props {
  cmsHome: CmsPage | null;
}

function Home({ cmsHome }: Props) {
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

      <RenderCmsSections sections={cmsHome?.sections ?? null} />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cmsHome = await Cms.getAllCmsPagesByContentType('page', {
    filters: {
      'settings.seo.slug': '/',
    },
  });

  return {
    props: {
      cmsHome: cmsHome?.data?.[0] ?? null,
    },
  };
};

export default Home;
