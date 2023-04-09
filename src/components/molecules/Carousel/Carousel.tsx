import { Box, Image } from '@chakra-ui/react';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';

interface Props extends SplideProps {
  images: Array<{ url: string; alt: string }>;
  label: string;
}

export const Carousel = ({ images, label, ...splideProps }: Props) => {
  return (
    <Box as="section" marginTop={'5'}>
      <Splide aria-label={label} {...splideProps}>
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
