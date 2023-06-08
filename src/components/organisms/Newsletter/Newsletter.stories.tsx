import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Newsletter } from '.';

export default {
  title: 'components/organisms/Newsletter',
  component: Newsletter,
} as ComponentMeta<typeof Newsletter>;

const queryClient = new QueryClient();

export const StoreNewsletter: ComponentStory<typeof Newsletter> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Newsletter
        title="Get News and Special Offers!"
        description="Receive our news and promotions in advance. Enjoy and get 10% off your first purchase. For more information click here."
        nameInputLabel="Your name"
        emailInputLabel="Your email"
        subscribeButtonLabel="Subscribe"
        icon={{ alt: '', icon: '' }}
      />
    </QueryClientProvider>
  );
};
