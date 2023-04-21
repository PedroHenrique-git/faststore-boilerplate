import { Box, BoxProps } from '@chakra-ui/react';
import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { Children, PropsWithChildren, forwardRef } from 'react';

interface Props {
  splideProps?: SplideProps;
  boxProps?: BoxProps;
}

export const Slider = forwardRef<Splide, PropsWithChildren<Props>>(
  function Slider({ children, boxProps, splideProps }, ref) {
    return (
      <Box
        {...boxProps}
        css={{
          '.splide__arrow--prev:disabled': { display: 'none' },
          '.splide__arrow--next:disabled': { display: 'none' },
          ...(boxProps?.css ? (boxProps?.css as Record<string, unknown>) : {}),
        }}
      >
        <Splide ref={ref} {...splideProps}>
          {Children.map(children, (child) => (
            <SplideSlide>{child}</SplideSlide>
          ))}
        </Splide>
      </Box>
    );
  },
);
