import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchSuggestions } from './SearchSuggestions';

export default {
  title: 'components/organisms/Search/SearchSuggestions',
  component: SearchSuggestions,
} as ComponentMeta<typeof SearchSuggestions>;

export const StoreSearchSuggestions: ComponentStory<
  typeof SearchSuggestions
> = () => {
  return (
    <SearchSuggestions
      products={[
        {
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
        },
      ]}
    />
  );
};
