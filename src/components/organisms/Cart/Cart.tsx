import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  List,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from 'src/sdk/cart';
import { cartSidebarAtom } from 'src/sdk/state';
import { CartEmpty } from './CartEmpty';
import { CartSummary } from './CartSummary';

export const Cart = () => {
  const [cartSidebar, setCartSideBar] = useAtom(cartSidebarAtom);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const {
    cart: { totalItems, items },
  } = useCart();

  const onOpen = () => setCartSideBar(true);
  const onClose = () => setCartSideBar(false);

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        background={'transparent'}
        _hover={{ background: 'transparent' }}
        _active={{ background: 'transparent' }}
        position={'relative'}
        leftIcon={<AiOutlineShoppingCart size={30} color="#000000A3" />}
        padding={0}
      >
        <Text
          borderRadius={'full'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          as="span"
          background={'gray.300'}
          top={0}
          position={'absolute'}
          right={0}
          w={'20px'}
          h={'20px'}
          fontSize={'small'}
          color={'gray.700'}
        >
          {totalItems}
        </Text>
      </Button>

      <Drawer
        isOpen={cartSidebar}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          {items.length ? (
            <>
              <DrawerHeader>
                <Text fontSize={'larger'} fontWeight={'bold'}>
                  Shopping cart
                </Text>
              </DrawerHeader>

              <DrawerBody>
                <List>
                  {items.map((item) => (
                    <CartSummary key={item.id} item={item} />
                  ))}
                </List>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose} w={'100%'}>
                  Checkout
                </Button>
              </DrawerFooter>
            </>
          ) : (
            <>
              <DrawerBody
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <CartEmpty />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
