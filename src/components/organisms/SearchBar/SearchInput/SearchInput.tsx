import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  forwardRef,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchInput = forwardRef<InputProps, 'input'>((props, ref) => (
  <InputGroup>
    <Input
      ref={ref}
      type="search"
      placeholder="Search everything at the store"
      {...props}
    />
    <InputRightAddon background="white" cursor={'pointer'} padding={0}>
      <Button
        background={'none'}
        borderRadius={0}
        _hover={{ background: 'none' }}
        _active={{ background: 'none' }}
        padding={0}
        w="100%"
        type="submit"
      >
        <AiOutlineSearch size={30} />
      </Button>
    </InputRightAddon>
  </InputGroup>
));
