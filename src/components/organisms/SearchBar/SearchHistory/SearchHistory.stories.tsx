import indexeddb from '@services/storage/indexeddb';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchHistory } from './SearchHistory';

export default {
  title: 'components/organisms/Search/SearchHistory',
  component: SearchHistory,
} as ComponentMeta<typeof SearchHistory>;

export const StoreSearchHistory: ComponentStory<typeof SearchHistory> = () => {
  indexeddb.set('fs:terms:history', [
    {
      value: 'test 1',
    },
    {
      value: 'test 2',
    },
    {
      value: 'test 3',
    },
  ]);

  return <SearchHistory />;
};
