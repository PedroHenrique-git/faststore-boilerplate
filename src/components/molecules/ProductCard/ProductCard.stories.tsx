import '@splidejs/react-splide/css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ComponentMeta, ComponentStory } from '@storybook/react';
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

export const StoreProductCard: ComponentStory<typeof ProductCard> = () => {
  return (
    <ProductCard
      product={{
        brand: { name: 'adidas' },
        description: 'Apple Magic Mouse',
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
          highPrice: 950.04,
          lowPrice: 950.04,
          offerCount: 1,
          offers: [
            {
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              listPrice: 999,
              price: 950.04,
              priceCurrency: 'USD',
              priceValidUntil: '2024-04-13T13:32:11Z',
              seller: { identifier: '1' },
              sellingPrice: 950.04,
            },
          ],
          priceCurrency: 'USD',
        },
        slug: 'apple-magic-mouse-99988216',
      }}
    />
  );
};
