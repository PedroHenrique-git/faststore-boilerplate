import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductsShelf } from '.';

export default {
  title: 'components/organisms/ProductsShelf',
  component: ProductsShelf,
} as ComponentMeta<typeof ProductsShelf>;

const queryClient = new QueryClient();

export const StoreProductsShelf: ComponentStory<typeof ProductsShelf> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsShelf
        title="Story shelf"
        variables={{
          after: '',
          first: 5,
          selectedFacets: [{ key: 'productClusterIds', value: '140' }],
          sort: 'price_desc',
        }}
      />
    </QueryClientProvider>
  );
};
