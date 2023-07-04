import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
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
import { MyAccountMenu } from '../MyAccountMenu';

export const OrderDetail = () => {
  const { selectedOrder } = useAtomValue(userData);
  const { formatter } = useFormatPrice();

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
    <>
      <MyAccountMenu />

      <Heading size="sm" marginBottom={'2rem'}>
        Order # {selectedOrder?.orderId}
      </Heading>

      <Flex
        gap={'3'}
        justifyContent={'space-between'}
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
      >
        {/** Address  */}
        <Card w={{ base: '100%', lg: 'calc(100%/3)' }}>
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

        {/** Payment method  */}
        <Card w={{ base: '100%', lg: 'calc(100%/3)' }}>
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

        {/** Summary  */}
        <Card w={{ base: '100%', lg: 'calc(100%/3)' }}>
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
                      {t.name.split(' ').at(-1)}
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

      <Heading size="sm" margin={'2rem 0'}>
        Package
      </Heading>

      <Heading size="sm" margin={'2rem 0'}>
        Products
      </Heading>

      {/** Products List  */}
      <List>
        <Stack divider={<StackDivider />} spacing="2">
          {selectedOrder?.items.map((i) => (
            <ListItem key={i.id}>
              <Flex>
                <Image
                  borderRadius="full"
                  boxSize="90px"
                  src={i.imageUrl}
                  alt={i.name}
                />

                <Text pt="2" fontSize="md">
                  {i.name} <br />
                  <small>{i.additionalInfo.brandName}</small>
                </Text>
              </Flex>
            </ListItem>
          ))}
        </Stack>
      </List>
    </>
  );
};
