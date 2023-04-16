import { Price } from '@atoms/Price';
import { Button, Flex, Image, ListItem, Text } from '@chakra-ui/react';
import { CiCircleRemove } from 'react-icons/ci';
import { CartItem } from 'src/sdk/cart';
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';

interface Props {
  item: CartItem | null;
}

export const CartSummary = ({ item }: Props) => {
  const { formatter } = useFormatPrice();
  const props = useRemoveButton(item?.id ?? '');

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
  } = item;

  return (
    <ListItem
      marginBottom={'15'}
      border={'1px solid'}
      borderColor={'gray.200'}
      padding={'3'}
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

        <Flex marginTop={'8'}>
          <Button
            background={'none'}
            display={'flex'}
            gap={'3'}
            color={'gray.700'}
            {...props}
          >
            <CiCircleRemove size={25} />
            remove
          </Button>
        </Flex>
      </Flex>
    </ListItem>
  );
};
