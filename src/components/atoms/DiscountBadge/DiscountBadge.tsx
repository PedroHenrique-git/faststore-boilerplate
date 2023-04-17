import { Badge } from '@chakra-ui/react';
import { useDiscountPercent } from 'src/sdk/product';

interface Props {
  listPrice: number;
  spotPrice: number;
}

export const DiscountBadge = ({ listPrice = 0, spotPrice = 0 }: Props) => {
  const discountPercent = useDiscountPercent({ listPrice, spotPrice });

  if (discountPercent === 0) {
    return null;
  }

  return (
    <Badge
      variant="subtle"
      colorScheme="green"
      borderRadius={'full'}
      fontSize="0.8em"
      maxW={'min-content'}
      padding={'0 .5rem'}
    >
      {discountPercent}% off
    </Badge>
  );
};
