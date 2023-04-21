import { MenuItem } from '@atoms/MenuItem';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  List,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

interface Props {
  menuLinks: Array<{ text: string; href: string }>;
}

export const MenuMobile = ({ menuLinks = [] }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        display={{ base: 'block', lg: 'none' }}
        background={'transparent'}
        _hover={{ background: 'transparent' }}
        _active={{ background: 'transparent' }}
        leftIcon={<GiHamburgerMenu size={'25'} color="#000000A3" />}
        paddingLeft={0}
        aria-label="Open menu mobile"
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton aria-label="Close menu mobile" />

          <DrawerBody>
            <List>
              {menuLinks.map(({ href, text }) => (
                <MenuItem key={text} href={href} text={text} />
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
