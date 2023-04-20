import { List } from '@chakra-ui/react';
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
      <List>
        <Newsletter
          title="Get News and Special Offers!"
          description="Receive our news and promotions in advance. Enjoy and get 10% off your first purchase. For more information click here."
          email-input-label="Your name"
          name-input-label="Your email"
          subscribe-button-label="Subscribe"
          icon={{ alt: '', icon: '' }}
        />
      </List>
    </QueryClientProvider>
  );
};
