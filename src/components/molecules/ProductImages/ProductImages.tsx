import { Button, Flex, Image } from '@chakra-ui/react';
import { StoreImage } from '@generated/graphql';
import { Slider } from '@molecules/Slider';
import { Splide, SplideProps } from '@splidejs/react-splide';
import { useRef } from 'react';
import { useEffectOnce } from 'react-use';

interface Props {
  images: StoreImage[];
}

const mainSliderOptions: SplideProps = {
  'aria-label': 'Products images main',
  options: { perPage: 1 },
};

const thumbsSliderOptions: SplideProps = {
  'aria-label': 'Products images thumbs',
  options: {
    rewind: true,
    pagination: false,
    arrows: false,
    fixedWidth: 75,
    fixedHeight: 75,
    gap: '1rem',
  },
};

export const ProductImages = ({ images }: Props) => {
  const mainRef = useRef<Splide | null>(null);
  const thumbsRef = useRef<Splide | null>(null);

  useEffectOnce(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  });

  return (
    <Flex direction={'column'} gap={'1rem'} as="section">
      <Slider ref={mainRef} splideProps={mainSliderOptions}>
        {images.map((image) => (
          <Image
            key={image.url}
            src={image.url}
            alt={image.alternateName}
            objectFit={'cover'}
            w={'100%'}
            maxH={530}
          />
        ))}
      </Slider>

      <Slider
        ref={thumbsRef}
        splideProps={thumbsSliderOptions}
        boxProps={{
          css: {
            '.splide__slide.is-active img': { border: '2px solid #2B6CB0' },
          },
        }}
      >
        {images.map((image, index) => (
          <Button
            key={`${image.url}-${index}`}
            onClick={() => mainRef.current?.go(index)}
            padding={0}
            w={'75px'}
            h={'75px'}
            background="transparent"
            _hover={{ background: 'transparent' }}
          >
            <Image
              key={image.url}
              boxSize={'75px'}
              src={image.url}
              alt={image.alternateName}
              objectFit={'cover'}
            />
          </Button>
        ))}
      </Slider>
    </Flex>
  );
};
