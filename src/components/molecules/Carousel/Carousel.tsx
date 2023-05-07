import { Box, Image } from '@chakra-ui/react';
import { Slider } from '@molecules/Slider';

interface Props {
  images: Array<{ url: string; alt: string }>;
}

export const Carousel = ({ images }: Props) => {
  return (
    <Box as="section" marginTop={'5'} data-testid="carousel">
      <Slider
        splideProps={{
          'aria-label': 'Banners home',
          options: { type: 'loop', autoplay: true },
        }}
      >
        {images.map((image) => (
          <Image
            key={image.alt}
            alt={image.alt}
            src={image.url}
            objectFit={'cover'}
            height={{ base: 295, lg: 400 }}
            w={'100%'}
          />
        ))}
      </Slider>
    </Box>
  );
};
