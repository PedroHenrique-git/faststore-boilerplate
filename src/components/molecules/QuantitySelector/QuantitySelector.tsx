import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';
import { useCartItemEvent } from 'src/sdk/analytics/hooks/useCartItemEvent';
import { CartItem, useCart } from 'src/sdk/cart';

interface Props {
  initialQuantity: number;
  item: CartItem;
}

export const QuantitySelector = ({ initialQuantity = 1, item }: Props) => {
  const { updateItemQuantity, isMutating } = useCart();

  const { id: itemId } = item;

  const { sendCartItemEvent } = useCartItemEvent();

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    defaultValue: initialQuantity,
    step: 1,
    min: -1,
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
          sendCartItemEvent(item, valueAsNumber);
        }}
        disabled={isMutating}
        data-testid="decrease-item-quantity"
      >
        -
      </Button>
      <Input {...input} textAlign={'center'} />
      <Button
        {...inc}
        onClick={(e) => {
          inc?.onClick?.(e);
          updateItemQuantity(valueAsNumber, itemId);
          sendCartItemEvent(item, valueAsNumber);
        }}
        disabled={isMutating}
        data-testid="increase-item-quantity"
      >
        +
      </Button>
    </HStack>
  );
};
