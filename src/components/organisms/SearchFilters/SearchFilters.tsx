import { Accordion, AccordionProps } from '@chakra-ui/react';
import { Filter_FacetsFragment } from '@generated/graphql';
import { BooleanFilter } from './BooleanFilter';
import { RangeFilter } from './RangeFilter';

interface Props extends AccordionProps {
  filters: Filter_FacetsFragment[];
}

export const SearchFilters = ({ filters, ...accordionProps }: Props) => {
  return (
    <Accordion
      defaultIndex={[]}
      allowMultiple
      as={'section'}
      {...accordionProps}
    >
      {filters.map((filter, index) =>
        filter.__typename === 'StoreFacetBoolean' ? (
          <BooleanFilter key={index} filter={filter} />
        ) : (
          <RangeFilter key={index} filter={filter} />
        ),
      )}
    </Accordion>
  );
};
