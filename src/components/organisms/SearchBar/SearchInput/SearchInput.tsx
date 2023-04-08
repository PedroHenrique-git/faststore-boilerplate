import {
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  forwardRef,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchInput = forwardRef<InputProps, 'input'>((props, ref) => (
  <InputGroup>
    <Input ref={ref} {...props} />
    <InputRightAddon background="white" cursor={'pointer'}>
      <AiOutlineSearch size={30} />
    </InputRightAddon>
  </InputGroup>
));
