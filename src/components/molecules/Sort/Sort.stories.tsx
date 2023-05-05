import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Sort } from '.';

export default {
  title: 'components/molecules/Sort',
  component: Sort,
} as ComponentMeta<typeof Sort>;

export const StoreSort: ComponentStory<typeof Sort> = () => {
  return <Sort />;
};
