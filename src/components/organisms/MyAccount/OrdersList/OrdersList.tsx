import {
  Badge,
  Flex,
  Link,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import NextLink from 'next/link';
import formatDate from 'src/sdk/helpers/formatDate';
import { useFormatPrice } from 'src/sdk/product';
import { userData } from 'src/sdk/state';
import { MyAccountMenu } from '../MyAccountMenu';

export const OrdersList = () => {
  const [userContent] = useAtom(userData);
  const { formatter } = useFormatPrice();

  const { orders } = userContent;

  return (
    <>
      <MyAccountMenu />

      {orders.length ? (
        <>
          <List>
            {orders.map((order) => (
              <ListItem
                key={order.orderId}
                boxShadow={'base'}
                borderRadius="xl"
                padding={'5'}
                marginBottom={'4'}
              >
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  gap={{ base: '4', lg: '0' }}
                  flexWrap={{ base: 'wrap', lg: 'nowrap' }}
                >
                  <Flex
                    gap={'6'}
                    justifyContent={'space-between'}
                    w={{ base: '100%', lg: 'auto' }}
                  >
                    <Text color={'GrayText'}>
                      <strong>Order date</strong> <br />
                      {formatDate(order.creationDate)}
                    </Text>

                    <Text color={'GrayText'}>
                      <strong>Total</strong> <br />
                      {formatter({ price: order.totalValue / 100 })}
                    </Text>
                  </Flex>

                  <Flex flexDirection={'column'}>
                    <Text color={'GrayText'}>
                      <Link
                        as={NextLink}
                        href={`/myaccount/orders/${order.orderId}`}
                        fontWeight={'bold'}
                      >
                        # {order.orderId}
                      </Link>

                      <Badge display={'block'} marginTop={'2'}>
                        {order.statusDescription}
                      </Badge>
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <VStack
            as={'section'}
            direction={['column', 'row']}
            spacing="24px"
            height={'100vh'}
            justifyContent={'center'}
          >
            <Text
              textAlign={'center'}
              color={'gray.700'}
              fontWeight={'bold'}
              fontSize={'2xl'}
            >
              No orders found.
            </Text>
          </VStack>
        </>
      )}
    </>
  );
};
