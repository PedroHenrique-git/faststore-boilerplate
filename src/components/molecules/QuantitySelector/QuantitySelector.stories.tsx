import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { QuantitySelector } from './QuantitySelector';

export default {
  title: 'components/molecules/QuantitySelector',
  component: QuantitySelector,
} as ComponentMeta<typeof QuantitySelector>;

const queryClient = new QueryClient();

export const StoreQuantitySelector: ComponentStory<
  typeof QuantitySelector
> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <QuantitySelector initialQuantity={10} itemId="" />
    </QueryClientProvider>
  );
};
