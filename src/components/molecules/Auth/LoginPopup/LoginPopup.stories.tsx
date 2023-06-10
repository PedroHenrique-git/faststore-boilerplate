import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LoginPopup } from './LoginPopup';

export default {
  title: 'components/molecules/Auth/LoginPopup',
  component: LoginPopup,
} as ComponentMeta<typeof LoginPopup>;

const queryClient = new QueryClient();

export const StoreLoginPopup: ComponentStory<typeof LoginPopup> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPopup />
    </QueryClientProvider>
  );
};
