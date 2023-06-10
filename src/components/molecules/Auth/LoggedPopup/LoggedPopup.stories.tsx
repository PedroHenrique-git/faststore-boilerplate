import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LoggedPopup } from './LoggedPopup';

export default {
  title: 'components/molecules/Auth/LoggedPopup',
  component: LoggedPopup,
} as ComponentMeta<typeof LoggedPopup>;

const queryClient = new QueryClient();

export const StoreLoggedPopup: ComponentStory<typeof LoggedPopup> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoggedPopup />
    </QueryClientProvider>
  );
};
