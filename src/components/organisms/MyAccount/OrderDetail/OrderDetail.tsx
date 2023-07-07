import { Box } from '@chakra-ui/react';
import { MyAccountMenu } from '../MyAccountMenu';
import { OrderDetailInfo } from './OrderDetailInfo';
import { OrderDetailPackage } from './OrderDetailPackage';
import { OrderDetailProductsList } from './OrderDetailProductsList';

export const OrderDetail = () => {
  return (
    <Box as="section" minH={'100vh'}>
      <MyAccountMenu />

      <OrderDetailInfo />

      <OrderDetailPackage />

      <OrderDetailProductsList />
    </Box>
  );
};
