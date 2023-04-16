import { Button } from '@chakra-ui/react';
import { CiCircleRemove } from 'react-icons/ci';
import { useRemoveButton } from 'src/sdk/cart/useRemoveButton';

interface Props {
  itemId: string;
}

export const RemoveButton = ({ itemId }: Props) => {
  const { isMutating, ...props } = useRemoveButton(itemId);

  return (
    <Button
      background={'none'}
      display={'flex'}
      gap={'3'}
      color={'gray.700'}
      disabled={isMutating}
      {...props}
    >
      <CiCircleRemove size={25} />
      remove
    </Button>
  );
};
