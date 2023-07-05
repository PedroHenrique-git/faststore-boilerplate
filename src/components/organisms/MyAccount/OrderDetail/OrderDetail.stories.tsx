import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OrderDetail } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: OrderDetail,
} as ComponentMeta<typeof OrderDetail>;

const queryClient = new QueryClient();

export const StoreOrderDetail: ComponentStory<typeof OrderDetail> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderDetail />
    </QueryClientProvider>
  );
};
