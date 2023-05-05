import { Accordion } from '@chakra-ui/react';
import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RangeFilter } from '.';

export default {
  title: 'components/organisms/SearchFilters/RangeFilter',
  component: RangeFilter,
} as ComponentMeta<typeof RangeFilter>;

const client = new QueryClient();

export const StoreRangeFilter: ComponentStory<typeof RangeFilter> = () => {
  return (
    <QueryClientProvider client={client}>
      <Accordion>
        <RangeFilter
          filter={{
            __typename: 'StoreFacetRange',
            key: 'test',
            label: 'TEST',
            max: { absolute: 1000, selected: 100 },
            min: { absolute: 500, selected: 0 },
          }}
        />
      </Accordion>
    </QueryClientProvider>
  );
};
