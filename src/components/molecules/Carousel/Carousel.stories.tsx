import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockImages } from 'src/mocks';
import { Carousel } from '.';

export default {
  title: 'components/molecules/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

export const StoreCarousel: ComponentStory<typeof Carousel> = () => {
  return <Carousel images={mockImages} />;
};
