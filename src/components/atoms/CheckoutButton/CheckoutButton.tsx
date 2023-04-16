import { Button } from '@chakra-ui/react';
import { useCheckoutButton } from 'src/sdk/cart';

export const CheckoutButton = () => {
  const props = useCheckoutButton();

  return (
    <Button variant="outline" mr={3} w={'100%'} {...props}>
      Checkout
    </Button>
  );
};
