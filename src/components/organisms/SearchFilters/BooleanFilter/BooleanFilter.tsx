import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Checkbox,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Filter_Facets_StoreFacetBoolean_Fragment } from '@generated/graphql';
import { useFilter } from 'src/sdk/search';

interface Props {
  filter: Filter_Facets_StoreFacetBoolean_Fragment;
}

export const BooleanFilter = ({ filter }: Props) => {
  const { addFilter, removeFilter } = useFilter();

  const { key, label, values } = filter;

  return (
    <AccordionItem key={label}>
      <AccordionButton>
        <Text as="span" flex="1" textAlign="left">
          {label}
        </Text>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Stack direction={'column'}>
          {values.map(({ label, value, selected, quantity }) => (
            <Checkbox
              key={value}
              value={value}
              defaultChecked={selected}
              onChange={(event) => {
                const { checked } = event.target;
                checked ? addFilter(key, value) : removeFilter(value);
              }}
            >
              {label} <Badge>{quantity}</Badge>
            </Checkbox>
          ))}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};
