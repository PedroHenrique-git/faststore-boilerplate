import { Box, Image } from '@chakra-ui/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';

interface Props {
  images: Array<{ url: string; alt: string }>;
  label: string;
}

export const Carousel = ({ images, label }: Props) => {
  return (
    <Box marginTop={'5'}>
      <Splide aria-label={label}>
        {images.map((image) => (
          <SplideSlide key={image.url}>
            <Image
              alt={image.alt}
              src={image.url}
              objectFit={'cover'}
              height={400}
              w={'100%'}
            />
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};
