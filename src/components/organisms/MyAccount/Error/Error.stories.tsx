import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Error } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: Error,
} as ComponentMeta<typeof Error>;

const queryClient = new QueryClient();

export const StoreMyAccountError: ComponentStory<typeof Error> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Error />
    </QueryClientProvider>
  );
};
