import { Image } from '@chakra-ui/react';
import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockImages } from 'src/mocks';
import { Slider } from '.';

export default {
  title: 'components/molecules/Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

export const StoreSlider: ComponentStory<typeof Slider> = () => {
  return (
    <Slider aria-label="Story Slider">
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
  );
};
