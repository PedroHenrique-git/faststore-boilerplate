import { Box, Text } from '@chakra-ui/react';
import { Params } from 'src/sdk/product/useFormatPrice';

interface Props {
  spotPrice: number;
  price: number;
  formatter(_params: Params): string;
}

export const Price = ({ spotPrice, price, formatter }: Props) => {
  const formattedSpotPrice = formatter({ price: spotPrice });
  const formattedPrice = formatter({ price });

  return (
    <Box display={'flex'} alignItems={'center'} gap={'2'}>
      {spotPrice < price && (
        <Text fontSize={'small'} textDecor={'line-through'}>
          {formattedPrice}
        </Text>
      )}
      <Text fontSize={'medium'} fontWeight={'bold'}>
        {formattedSpotPrice}
      </Text>
    </Box>
  );
};
