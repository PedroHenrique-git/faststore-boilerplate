import { CheckoutButton } from '@atoms/CheckoutButton';
import {
  Box,
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
import { AiOutlineGift, AiOutlineShoppingCart } from 'react-icons/ai';
import { useViewCartEvent } from 'src/sdk/analytics/hooks/useViewCartEvent';
import { useCart } from 'src/sdk/cart';
import { cartSidebarAtom } from 'src/sdk/state';
import { CartEmpty } from '../CartEmpty/CartEmpty';
import { CartGiftSummary } from '../CartGiftSummary/CartGiftSummary';
import { CartSummary } from '../CartSummary/CartSummary';
import { OrderSummary } from '../OrderSummary/OrderSummary';

export const Cart = () => {
  const [cartSidebar, setCartSideBar] = useAtom(cartSidebarAtom);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const {
    cart: { totalItems, items, subTotal, total, gifts },
  } = useCart();

  const onOpen = () => setCartSideBar(true);
  const onClose = () => setCartSideBar(false);

  useViewCartEvent({
    items: items.concat(gifts),
    total,
    cartOpen: cartSidebar,
  });

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

                {!!gifts.length && (
                  <Box marginTop={'10'}>
                    <Box
                      background={'gray.100'}
                      padding={'.5rem'}
                      marginBottom={'5'}
                      display={'flex'}
                      alignItems={'center'}
                      gap={'1.5'}
                    >
                      <AiOutlineGift size={25} />
                      <Text>Gifts</Text>
                    </Box>
                    <List>
                      {gifts.map((gift) => (
                        <CartGiftSummary key={gift.id} item={gift} />
                      ))}
                    </List>
                  </Box>
                )}
              </DrawerBody>

              <DrawerFooter
                display={'flex'}
                flexDirection={'column'}
                gap={'5'}
                border={'1px solid'}
                borderColor={'gray.100'}
              >
                <OrderSummary subTotal={subTotal} total={total} />
                <CheckoutButton />
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
