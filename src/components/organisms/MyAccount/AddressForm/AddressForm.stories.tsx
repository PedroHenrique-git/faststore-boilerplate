import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AddressForm } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: AddressForm,
} as ComponentMeta<typeof AddressForm>;

const queryClient = new QueryClient();

export const StoreMyAccountAddressForm: ComponentStory<
  typeof AddressForm
> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddressForm />
    </QueryClientProvider>
  );
};
