import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductImages } from '.';

export default {
  title: 'components/molecules/ProductImages',
  component: ProductImages,
} as ComponentMeta<typeof ProductImages>;

const queryClient = new QueryClient();

export const StoreProductImages: ComponentStory<typeof ProductImages> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductImages
        images={[
          {
            url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
            alternateName: 'appleblack',
          },
          {
            url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
            alternateName: 'appleblack',
          },
          {
            url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
            alternateName: 'appleblack',
          },
          {
            url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
            alternateName: 'appleblack',
          },
          {
            url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
            alternateName: 'appleblack',
          },
          {
            url: 'https://storeframework.vtexassets.com/arquivos/ids/190932/mouse-black.jpg?v=1767729450',
            alternateName: 'appleblack',
          },
        ]}
      />
    </QueryClientProvider>
  );
};
