import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { Filter_Facets_StoreFacetRange_Fragment } from '@generated/graphql';
import { debounce } from 'radash';
import { useFilter } from 'src/sdk/search';

interface Props {
  filter: Filter_Facets_StoreFacetRange_Fragment;
}

export const RangeFilter = ({ filter }: Props) => {
  const { rangeFilter } = useFilter();

  const { key, label, max, min } = filter;

  return (
    <AccordionItem key={label}>
      <AccordionButton>
        <Text as="span" flex="1" textAlign="left">
          {label}
        </Text>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={[min.selected, max.selected]}
          min={min.absolute}
          max={max.absolute}
          onChange={debounce({ delay: 1000 }, ([min, max]) =>
            rangeFilter(key, `${min}-to-${max}`),
          )}
        >
          <RangeSliderTrack h={1.5}>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>

          <RangeSliderThumb index={0} w={5} h={5} />
          <RangeSliderThumb index={1} w={5} h={5} />
        </RangeSlider>
      </AccordionPanel>
    </AccordionItem>
  );
};
