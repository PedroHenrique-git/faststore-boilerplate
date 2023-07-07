import { Badge, Box, Heading, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import getShippingInfo from 'src/sdk/helpers/getShippingInfo';
import { userData } from 'src/sdk/state';

export const OrderDetailPackage = () => {
  const { selectedOrder } = useAtomValue(userData);

  const { days, name } = selectedOrder?.shippingData
    ? getShippingInfo(selectedOrder.shippingData)
    : { name: '', days: '' };

  return (
    <Box as="section" margin={'2rem 0'}>
      <Heading size="sm" marginBottom={'2rem'}>
        Package
      </Heading>

      <Text textAlign={'left'}>
        Order will be delivered within {days} days
        <Badge marginLeft={{ base: '0', lg: '2' }}>{name}</Badge>
      </Text>
    </Box>
  );
};
