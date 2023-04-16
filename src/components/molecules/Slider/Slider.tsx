import { Box } from '@chakra-ui/react';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { Children, PropsWithChildren } from 'react';

export const Slider = ({
  children,
  ...splideProps
}: PropsWithChildren<SplideProps>) => {
  return (
    <Box
      css={{
        '.splide__arrow--prev:disabled': { display: 'none' },
        '.splide__arrow--next:disabled': { display: 'none' },
      }}
    >
      <Splide {...splideProps}>
        {Children.map(children, (child) => (
          <SplideSlide>{child}</SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};
