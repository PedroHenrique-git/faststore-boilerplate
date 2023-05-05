import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from '@chakra-ui/react';
import { Filter_Facets_StoreFacetRange_Fragment } from '@generated/graphql';
import { debounce } from 'radash';
import { useFormatPrice } from 'src/sdk/product';
import { useFilter } from 'src/sdk/search';

interface Props {
  filter: Filter_Facets_StoreFacetRange_Fragment;
}

export const RangeFilter = ({ filter }: Props) => {
  const { rangeFilter } = useFilter();
  const { formatter } = useFormatPrice();

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

          <RangeSliderThumb index={0} w={4} h={4} />
          <RangeSliderThumb index={1} w={4} h={4} />
        </RangeSlider>
        <Flex justifyContent={'space-between'}>
          <Text fontSize={'1em'} color={'gray.800'} fontWeight={'light'}>
            {formatter({ price: min.selected })}
          </Text>
          <Text fontSize={'1em'} color={'gray.800'} fontWeight={'light'}>
            {formatter({ price: max.selected })}
          </Text>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
