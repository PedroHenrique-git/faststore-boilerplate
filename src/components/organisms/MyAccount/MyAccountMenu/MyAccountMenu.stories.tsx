import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MyAccountMenu } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: MyAccountMenu,
} as ComponentMeta<typeof MyAccountMenu>;

const queryClient = new QueryClient();

export const StoreMyAccountMenu: ComponentStory<typeof MyAccountMenu> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MyAccountMenu />
    </QueryClientProvider>
  );
};
