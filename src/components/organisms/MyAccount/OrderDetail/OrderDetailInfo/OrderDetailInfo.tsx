import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import getCompleteAddress from 'src/sdk/helpers/getCompleteAddress';
import getCompleteName from 'src/sdk/helpers/getCompleteName';
import mapPayments from 'src/sdk/helpers/mapPayments';
import { useFormatPrice } from 'src/sdk/product';
import { userData } from 'src/sdk/state';
import { OrderActions } from '../OrderActions/OrderActions';

export const OrderDetailInfo = () => {
  const { formatter } = useFormatPrice();
  const { selectedOrder } = useAtomValue(userData);

  const orderId = selectedOrder?.orderId;

  const completeName = selectedOrder?.clientProfileData
    ? getCompleteName(selectedOrder?.clientProfileData)
    : '';

  const completeAddress = selectedOrder?.shippingData
    ? getCompleteAddress(selectedOrder.shippingData)
    : '';

  const paymentsMethods = selectedOrder?.paymentData
    ? mapPayments(selectedOrder?.paymentData)
    : [];

  return (
    <Box as="section">
      <Heading size="sm" marginBottom={'2rem'}>
        Order # {orderId}
      </Heading>

      <OrderActions orderId={orderId ?? ''} />

      <Flex
        gap={'3'}
        justifyContent={'space-between'}
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        as={'section'}
      >
        <Card w={{ base: '100%', lg: 'calc(100%/3)' }} as={'section'}>
          <CardHeader>
            <Heading size="sm">Address</Heading>
          </CardHeader>

          <CardBody>
            <Box>
              <Heading size="sm">{completeName}</Heading>
              <Text pt="2" fontSize="sm">
                {completeAddress}
              </Text>
            </Box>
          </CardBody>
        </Card>

        <Card w={{ base: '100%', lg: 'calc(100%/3)' }} as={'section'}>
          <CardHeader>
            <Heading size="sm">Payment method</Heading>
          </CardHeader>

          <CardBody>
            {paymentsMethods?.map((pm) => (
              <Box key={pm.name}>
                <Heading size="sm">{pm.name}</Heading>
                <Text pt="2" fontSize="sm">
                  {formatter({ price: pm.value / 100 })} ({pm.installments}x)
                </Text>
              </Box>
            ))}
          </CardBody>
        </Card>

        <Card w={{ base: '100%', lg: 'calc(100%/3)' }} as={'section'}>
          <CardHeader>
            <Heading size="sm">Summary</Heading>
          </CardHeader>

          <CardBody>
            <List>
              <Stack divider={<StackDivider />} spacing="0">
                {selectedOrder?.totals.map((t) => (
                  <ListItem
                    key={t.id}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    <Text pt="2" fontSize="smaller">
                      {t.name}
                    </Text>
                    <Text pt="2" fontSize="smaller">
                      {formatter({ price: t.value / 100 })}
                    </Text>
                  </ListItem>
                ))}

                <ListItem display={'flex'} justifyContent={'space-between'}>
                  <Text pt="2" fontSize="smaller">
                    Total
                  </Text>
                  <Text pt="2" fontSize="smaller">
                    {formatter({ price: (selectedOrder?.value ?? 0) / 100 })}
                  </Text>
                </ListItem>
              </Stack>
            </List>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};
