import { Flex, Text } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const CartEmpty = () => {
  return (
    <Flex direction={'column'} gap={'2'} alignItems={'center'}>
      <AiOutlineShoppingCart size={90} color="#000000A3" />
      <Text fontSize={'larger'} fontWeight={'medium'} color="blackAlpha.700">
        Your cart is empty
      </Text>
    </Flex>
  );
};
