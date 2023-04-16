import '@splidejs/react-splide/css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductCard from '.';

export default {
  title: 'components/molecules/ProductCard',
  component: ProductCard,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
} as ComponentMeta<typeof ProductCard>;

const queryClient = new QueryClient();

export const StoreProductCard: ComponentStory<typeof ProductCard> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductCard
        product={{
          brand: { brandName: 'adidas', name: 'adidas' },
          image: [
            {
              url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
              alternateName: 'appleblack',
            },
          ],
          isVariantOf: {
            productGroupID: '99995945',
            name: 'Apple Magic Mouse',
          },
          name: 'Magic black',
          offers: {
            lowPrice: 403.09,
            offers: [
              {
                availability: 'https://schema.org/InStock',
                quantity: 1,
                listPrice: 999,
                price: 950.04,
                seller: { identifier: '1' },
              },
            ],
          },
          slug: 'apple-magic-mouse-99988216',
          id: '213123',
          additionalProperty: [
            { name: '', propertyID: '', value: 2323, valueReference: '' },
          ],
          gtin: '1232',
          sku: '1123123',
        }}
      />
    </QueryClientProvider>
  );
};
