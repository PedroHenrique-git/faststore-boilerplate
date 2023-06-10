import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { Login } from '@organisms/Login';
import { AiOutlineUser } from 'react-icons/ai';

export const LoginPopup = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          sx={{
            background: 'transparent',
            _hover: { background: 'transparent' },
            _active: { background: 'transparent' },
            _focus: { background: 'transparent' },
          }}
        >
          <AiOutlineUser size={30} color="#000000A3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody padding={'5'}>
          <Login />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
