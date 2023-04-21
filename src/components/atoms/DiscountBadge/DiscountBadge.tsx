import { Badge, BadgeProps } from '@chakra-ui/react';
import { memo } from 'react';
import { useDiscountPercent } from 'src/sdk/product';

interface Props extends BadgeProps {
  listPrice: number;
  spotPrice: number;
}

const DiscountBadge = ({
  listPrice = 0,
  spotPrice = 0,
  ...badgeProps
}: Props) => {
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
      {...badgeProps}
    >
      {discountPercent}% off
    </Badge>
  );
};

export default memo(DiscountBadge);
