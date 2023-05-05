import '@splidejs/react-splide/css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FiltersSideBar } from '.';

export default {
  title: 'components/organisms/SearchFilters/FiltersSideBar',
  component: FiltersSideBar,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
} as ComponentMeta<typeof FiltersSideBar>;

const client = new QueryClient();

export const StoreFiltersSideBar: ComponentStory<
  typeof FiltersSideBar
> = () => {
  return (
    <QueryClientProvider client={client}>
      <FiltersSideBar
        facets={[
          {
            key: 'category-1',
            label: 'Department',
            values: [
              {
                label: 'Computer & Software',
                value: 'computer---software',
                selected: false,
                quantity: 304,
              },
              {
                label: 'Kitchen & Home Appliances',
                value: 'kitchen---home-appliances',
                selected: false,
                quantity: 317,
              },
              {
                label: 'Office',
                value: 'office',
                selected: false,
                quantity: 350,
              },
            ],
            __typename: 'StoreFacetBoolean',
          },
          {
            key: 'category-2',
            label: 'Category',
            values: [
              {
                label: 'Appliances',
                value: 'appliances',
                selected: false,
                quantity: 144,
              },
              {
                label: 'Chairs',
                value: 'chairs',
                selected: false,
                quantity: 178,
              },
              {
                label: 'Desks',
                value: 'desks',
                selected: false,
                quantity: 172,
              },
              {
                label: 'Fridges',
                value: 'fridges',
                selected: false,
                quantity: 173,
              },
              {
                label: 'Gadgets',
                value: 'gadgets',
                selected: false,
                quantity: 151,
              },
              {
                label: 'Smartphones',
                value: 'smartphones',
                selected: false,
                quantity: 153,
              },
            ],
            __typename: 'StoreFacetBoolean',
          },
          {
            key: 'price',
            label: 'Price',
            min: {
              selected: 7.6,
              absolute: 7.6,
            },
            max: {
              selected: 988.45,
              absolute: 988.45,
            },
            __typename: 'StoreFacetRange',
          },
        ]}
      />
    </QueryClientProvider>
  );
};
