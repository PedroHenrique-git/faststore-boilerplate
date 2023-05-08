import Price from '@atoms/Price';
import { RemoveButton } from '@atoms/RemoveButton/RemoveButton';
import { Flex, Image, ListItem, Text } from '@chakra-ui/react';
import { QuantitySelector } from '@molecules/QuantitySelector';
import { CartItem } from 'src/sdk/cart';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';

interface Props {
  item: CartItem | null;
}

export const CartSummary = ({ item }: Props) => {
  const { formatter } = useFormatPrice();

  if (!item) {
    return null;
  }

  const {
    listPrice,
    price,
    itemOffered: {
      name,
      image: [firstImage],
    },
    quantity,
  } = item;

  return (
    <ListItem
      marginBottom={'15'}
      border={'1px solid'}
      borderColor={'gray.200'}
      padding={'3'}
      data-item-quantity={quantity}
    >
      <Flex as={'article'} direction={'column'}>
        <Flex gap={'5'} alignItems={'center'}>
          <Image
            src={firstImage.url}
            alt={name}
            objectFit={'cover'}
            boxSize={'90px'}
          />

          <Flex direction={'column'}>
            <Text>{name}</Text>
            <Price formatter={formatter} price={listPrice} spotPrice={price} />
          </Flex>
        </Flex>

        <Flex marginTop={'8'} justifyContent={'space-between'}>
          <RemoveButton item={item} />
          <QuantitySelector initialQuantity={quantity} item={item} />
        </Flex>
      </Flex>
    </ListItem>
  );
};
