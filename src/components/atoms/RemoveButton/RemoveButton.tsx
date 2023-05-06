import { Button } from '@chakra-ui/react';
import { CiCircleRemove } from 'react-icons/ci';
import { CartItem } from 'src/sdk/cart';
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton';

interface Props {
  item: CartItem;
}

export const RemoveButton = ({ item }: Props) => {
  const props = useRemoveButton(item);

  return (
    <Button
      background={'none'}
      display={'flex'}
      gap={'3'}
      color={'gray.700'}
      {...props}
    >
      <CiCircleRemove size={25} />
      remove
    </Button>
  );
};
