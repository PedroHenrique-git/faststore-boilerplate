import { Box, Image } from '@chakra-ui/react';
import { Slider } from '@molecules/Slider';
import { RenderCmsSections } from 'src/components/cms';
import { mockImages } from 'src/mocks';
import { CmsPage } from 'src/services/cms/types';

interface Props {
  cmsHome: CmsPage | null;
}

export const Home = ({ cmsHome }: Props) => {
  return (
    <Box>
      <Box as="section" marginTop={'5'}>
        <Slider
          aria-label="Banners home"
          options={{
            type: 'loop',
            autoplay: true,
          }}
        >
          {mockImages.map((image) => (
            <Image
              key={image.alt}
              alt={image.alt}
              src={image.url}
              objectFit={'cover'}
              height={400}
              w={'100%'}
            />
          ))}
        </Slider>
      </Box>

      <RenderCmsSections sections={cmsHome?.sections ?? null} />
    </Box>
  );
};
