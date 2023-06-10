import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AccessKey } from '.';

export default {
  title: 'components/organisms/Login/AccessKey',
  component: AccessKey,
} as ComponentMeta<typeof AccessKey>;

const queryClient = new QueryClient();

export const StoreAccessKey: ComponentStory<typeof AccessKey> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessKey />
    </QueryClientProvider>
  );
};
