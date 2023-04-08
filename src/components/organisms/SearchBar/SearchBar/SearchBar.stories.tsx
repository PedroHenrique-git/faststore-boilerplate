import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SearchBar } from '..';

export default {
  title: 'components/organisms/Search/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const queryClient = new QueryClient();

export const StoreSearchBar: ComponentStory<typeof SearchBar> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchBar />
    </QueryClientProvider>
  );
};
