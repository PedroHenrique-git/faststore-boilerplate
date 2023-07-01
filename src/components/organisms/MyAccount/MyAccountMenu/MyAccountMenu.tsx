import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export const MyAccountMenu = () => {
  const { push, pathname } = useRouter();

  const currentSection =
    pathname === '/myaccount/profile'
      ? 'Profile'
      : pathname === '/myaccount/addresses'
      ? 'Addresses'
      : 'Orders';

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<MdOutlineKeyboardArrowDown size={15} />}
        margin={'2rem 0'}
      >
        {currentSection}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => push('/myaccount/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => push('/myaccount/addresses')}>
          Addresses
        </MenuItem>
        <MenuItem onClick={() => push('/myaccount/orders')}>Orders</MenuItem>
      </MenuList>
    </Menu>
  );
};
