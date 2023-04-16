import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import { useCart } from 'src/sdk/cart';

interface Props {
  initialQuantity: number;
  itemId: string;
}

export const CartQuantitySelector = ({
  initialQuantity = 1,
  itemId,
}: Props) => {
  const { updateItemQuantity } = useCart();

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    defaultValue: initialQuantity,
    step: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="200px">
      <Button
        {...dec}
        onClick={(e) => {
          dec?.onClick?.(e);
          updateItemQuantity(valueAsNumber, itemId);
        }}
      >
        -
      </Button>
      <Input {...input} textAlign={'center'} />
      <Button
        {...inc}
        onClick={(e) => {
          inc?.onClick?.(e);
          updateItemQuantity(valueAsNumber, itemId);
        }}
      >
        +
      </Button>
    </HStack>
  );
};
