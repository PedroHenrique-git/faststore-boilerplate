import { List } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchProductCart } from './SearchProductCard';

export default {
  title: 'components/organisms/Search/SearchProductCart',
  component: SearchProductCart,
} as ComponentMeta<typeof SearchProductCart>;

export const StoreSearchProductCard: ComponentStory<
  typeof SearchProductCart
> = () => {
  return (
    <List>
      <SearchProductCart
        product={{
          isVariantOf: {
            name: '',
            productGroupID: '',
          },
          slug: '/',
          brand: {
            name: 'test',
          },
          description: 'test',
          image: [
            {
              alternateName: 'test',
              url: '/banners/banner-one.jpg',
            },
          ],
          name: 'Test',
          offers: {
            highPrice: 100,
            lowPrice: 100,
            offerCount: 10,
            offers: [
              {
                availability: '',
                itemCondition: '',
                listPrice: 300,
                price: 200,
                priceCurrency: 'BRL',
                priceValidUntil: '',
                seller: { identifier: '' },
                sellingPrice: 100,
              },
            ],
            priceCurrency: '',
          },
        }}
      />
    </List>
  );
};
