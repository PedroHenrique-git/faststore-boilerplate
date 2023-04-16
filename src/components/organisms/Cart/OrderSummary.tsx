import { List, ListItem, Text } from '@chakra-ui/react';
import { useFormatPrice } from 'src/sdk/product';

interface Props {
  subTotal: number;
  total: number;
}

export const OrderSummary = ({ subTotal, total }: Props) => {
  const { formatter } = useFormatPrice();

  return (
    <List
      display={'flex'}
      justifyContent={'flex-start'}
      flexDirection={'column'}
      w={'100%'}
      gap={'2'}
    >
      <ListItem display={'flex'} justifyContent={'space-between'}>
        <Text>Subtotal</Text>
        <Text>{formatter({ price: subTotal })}</Text>
      </ListItem>
      <ListItem display={'flex'} justifyContent={'space-between'}>
        <Text>Discount</Text>
        <Text>-{formatter({ price: subTotal - total })}</Text>
      </ListItem>
      <ListItem display={'flex'} justifyContent={'space-between'}>
        <Text>Total</Text>
        <Text>{formatter({ price: total })}</Text>
      </ListItem>
    </List>
  );
};
