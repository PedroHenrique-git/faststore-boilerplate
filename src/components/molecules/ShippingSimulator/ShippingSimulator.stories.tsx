import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ShippingSimulator } from '.';

export default {
  title: 'components/molecules/ShippingSimulator',
  component: ShippingSimulator,
} as ComponentMeta<typeof ShippingSimulator>;

const queryClient = new QueryClient();

export const StoreShippingSimulator: ComponentStory<
  typeof ShippingSimulator
> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ShippingSimulator items={[{ id: '', quantity: 1, seller: '1' }]} />
    </QueryClientProvider>
  );
};
