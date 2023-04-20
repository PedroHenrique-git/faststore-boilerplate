import { List } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartGiftSummary } from './CartGiftSummary';

export default {
  title: 'components/organisms/Cart/CartGiftSummary',
  component: CartGiftSummary,
} as ComponentMeta<typeof CartGiftSummary>;

const queryClient = new QueryClient();

export const StoreCartGiftSummary: ComponentStory<
  typeof CartGiftSummary
> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <List>
        <CartGiftSummary
          item={{
            itemOffered: {
              brand: { name: 'BLACK+DECKER' },
              name: 'ivory',
              sku: '78459415',
              gtin: '9068414012597',
              additionalProperty: [],
              isVariantOf: {
                name: 'Licensed Soft Soap Refined',
                productGroupID: '15803946',
              },
              image: [
                {
                  alternateName: 'nam',
                  url: 'https://storeframework.vtexassets.com/arquivos/ids/184640/perspiciatis.jpg?v=1757918130',
                },
              ],
            },
            id: '78459415::1',
            listPrice: 468.55,
            price: 445.35,
            quantity: 1,
            seller: { identifier: '1' },
          }}
        />
      </List>
    </QueryClientProvider>
  );
};
