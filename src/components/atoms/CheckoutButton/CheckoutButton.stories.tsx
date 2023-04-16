import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CheckoutButton } from './CheckoutButton';

export default {
  title: 'components/atoms/CheckoutButton',
  component: CheckoutButton,
} as ComponentMeta<typeof CheckoutButton>;

const queryClient = new QueryClient();

export const StoreCheckoutButton: ComponentStory<
  typeof CheckoutButton
> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutButton />
    </QueryClientProvider>
  );
};
