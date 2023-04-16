import { Flex, Image, ListItem, Text } from '@chakra-ui/react';
import { CartItem } from 'src/sdk/cart';

interface Props {
  item: CartItem | null;
}

export const CartGiftSummary = ({ item }: Props) => {
  if (!item) {
    return null;
  }

  const {
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
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
};
