import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Carousel, mockImages } from '.';

export default {
  title: 'components/molecules/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

export const StoreLogo: ComponentStory<typeof Carousel> = () => {
  return <Carousel images={mockImages} label="Story carousel" />;
};
