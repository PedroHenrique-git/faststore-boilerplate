import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { CancelOrder } from '../CancelOrder';

interface Props {
  orderId: string;
}

export const OrderActions = ({ orderId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<MdOutlineKeyboardArrowDown size={15} />}
          marginBottom={'2rem'}
        >
          Options
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onOpen()} color={'red.400'}>
            Cancel order
          </MenuItem>
        </MenuList>
      </Menu>

      <CancelOrder
        handleCloseModal={onClose}
        isModalOpen={isOpen}
        orderId={orderId ?? ''}
      />
    </>
  );
};
