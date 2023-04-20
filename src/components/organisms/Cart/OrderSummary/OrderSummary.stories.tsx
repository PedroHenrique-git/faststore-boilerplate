import { List } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OrderSummary } from './OrderSummary';

export default {
  title: 'components/organisms/Cart/OrderSummary',
  component: OrderSummary,
} as ComponentMeta<typeof OrderSummary>;

const queryClient = new QueryClient();

export const StoreOrderSummary: ComponentStory<typeof OrderSummary> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <List>
        <OrderSummary subTotal={2300} total={3000} />
      </List>
    </QueryClientProvider>
  );
};
