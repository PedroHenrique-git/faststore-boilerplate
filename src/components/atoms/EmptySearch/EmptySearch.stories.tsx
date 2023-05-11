import { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmptySearch } from '.';

export default {
  title: 'components/atoms/EmptySearch',
  component: EmptySearch,
} as ComponentMeta<typeof EmptySearch>;

export const StoreEmptySearch: ComponentStory<typeof EmptySearch> = () => {
  return <EmptySearch />;
};
