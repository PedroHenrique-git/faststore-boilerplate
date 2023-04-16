import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RemoveButton } from './RemoveButton';

export default {
  title: 'components/atoms/RemoveButton',
  component: RemoveButton,
} as ComponentMeta<typeof RemoveButton>;

const queryClient = new QueryClient();

export const StoreRemoveButton: ComponentStory<typeof RemoveButton> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RemoveButton itemId="" />
    </QueryClientProvider>
  );
};
