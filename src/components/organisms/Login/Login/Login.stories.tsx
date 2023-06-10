import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Login } from '.';

export default {
  title: 'components/organisms/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const queryClient = new QueryClient();

export const StoreLogin: ComponentStory<typeof Login> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
};
