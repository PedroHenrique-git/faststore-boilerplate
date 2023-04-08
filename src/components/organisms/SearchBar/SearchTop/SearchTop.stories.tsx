import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchTop } from './SearchTop';

export default {
  title: 'components/organisms/Search/SearchTop',
  component: SearchTop,
} as ComponentMeta<typeof SearchTop>;

export const StoreSearchTop: ComponentStory<typeof SearchTop> = () => {
  return (
    <SearchTop
      terms={[
        { value: 'term 1' },
        { value: 'term 2' },
        { value: 'term 3' },
        { value: 'term 4' },
      ]}
    />
  );
};
