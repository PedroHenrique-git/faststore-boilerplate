import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Profile } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const queryClient = new QueryClient();

export const StoreMyAccountProfile: ComponentStory<typeof Profile> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Profile />
    </QueryClientProvider>
  );
};
