import { menuLinks } from '@molecules/Menu';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from '.';

export default {
  title: 'components/organisms/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const queryClient = new QueryClient();

export const StoreHeader: ComponentStory<typeof Header> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header menuLinks={menuLinks} />
    </QueryClientProvider>
  );
};
