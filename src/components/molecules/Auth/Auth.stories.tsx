import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Auth } from './Auth';

export default {
  title: 'components/molecules/Auth',
  component: Auth,
} as ComponentMeta<typeof Auth>;

const queryClient = new QueryClient();

export const StoreAuth: ComponentStory<typeof Auth> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth />
    </QueryClientProvider>
  );
};
