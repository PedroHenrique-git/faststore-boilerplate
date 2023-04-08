import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IndexedDBService } from 'src/services/storage/IndexedDBService';
import { SearchHistory } from './SearchHistory';

export default {
  title: 'components/organisms/Search/SearchHistory',
  component: SearchHistory,
} as ComponentMeta<typeof SearchHistory>;

const storeService = new IndexedDBService();

export const StoreSearchHistory: ComponentStory<typeof SearchHistory> = () => {
  storeService.set('fs:terms:history', [
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
