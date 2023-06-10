import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LoginMethods } from '.';

export default {
  title: 'components/organisms/Login/LoginMethods',
  component: LoginMethods,
} as ComponentMeta<typeof LoginMethods>;

const queryClient = new QueryClient();

export const StoreLoginMethods: ComponentStory<typeof LoginMethods> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginMethods />
    </QueryClientProvider>
  );
};
