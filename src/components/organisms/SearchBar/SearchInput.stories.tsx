import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchInput } from './SearchInput';

export default {
  title: 'components/organisms/Search/SearchInput',
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

export const StoreSearchInput: ComponentStory<typeof SearchInput> = () => {
  return <SearchInput />;
};
