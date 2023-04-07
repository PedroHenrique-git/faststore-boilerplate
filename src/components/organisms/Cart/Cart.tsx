import { Button, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const Cart = () => {
  const { onOpen } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Button
      ref={btnRef}
      onClick={onOpen}
      background={'transparent'}
      _hover={{ background: 'transparent' }}
      _active={{ background: 'transparent' }}
      leftIcon={<AiOutlineShoppingCart size={30} color="#000000A3" />}
      padding={0}
      data-testid="open-menu-mobile"
    />
  );
};
