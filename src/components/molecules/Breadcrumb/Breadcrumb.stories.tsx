import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Breadcrumb } from '.';

export default {
  title: 'components/molecules/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

export const StoreBreadcrumb: ComponentStory<typeof Breadcrumb> = () => {
  return (
    <Breadcrumb
      items={[
        { item: '/one', name: 'one', position: 1 },
        { item: '/two', name: 'two', position: 2 },
        { item: '/three', name: 'three', position: 3 },
        { item: '/four', name: 'four', position: 4 },
      ]}
    />
  );
};
