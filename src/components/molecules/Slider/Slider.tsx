import { Splide, SplideProps, SplideSlide } from '@splidejs/react-splide';
import { Children, PropsWithChildren } from 'react';

export const Slider = ({
  children,
  ...splideProps
}: PropsWithChildren<SplideProps>) => {
  return (
    <Splide {...splideProps}>
      {Children.map(children, (child) => (
        <SplideSlide>{child}</SplideSlide>
      ))}
    </Splide>
  );
};
