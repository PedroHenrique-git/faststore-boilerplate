import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Cart } from './Cart';

export default {
  title: 'components/organisms/Cart',
  component: Cart,
} as ComponentMeta<typeof Cart>;

const queryClient = new QueryClient();

export const StoreCart: ComponentStory<typeof Cart> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Cart />
    </QueryClientProvider>
  );
};
