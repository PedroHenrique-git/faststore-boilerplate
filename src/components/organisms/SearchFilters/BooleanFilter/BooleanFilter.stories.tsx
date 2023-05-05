import { Accordion } from '@chakra-ui/react';
import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BooleanFilter } from '.';

export default {
  title: 'components/organisms/SearchFilters/BooleanFilter',
  component: BooleanFilter,
} as ComponentMeta<typeof BooleanFilter>;

export const StoreBooleanFilter: ComponentStory<typeof BooleanFilter> = () => {
  return (
    <Accordion>
      <BooleanFilter
        filter={{
          __typename: 'StoreFacetBoolean',
          key: 'test',
          label: 'TEST',
          values: [
            { label: 'test 1', quantity: 1, selected: true, value: 'test 1' },
            { label: 'test 2', quantity: 1, selected: true, value: 'test 2' },
            { label: 'test 3', quantity: 1, selected: true, value: 'test 3' },
          ],
        }}
      />
    </Accordion>
  );
};
