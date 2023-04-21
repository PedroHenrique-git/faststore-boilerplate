import { Login } from '@atoms/Login';
import { Logo } from '@atoms/Logo';
import { Box, Container } from '@chakra-ui/react';
import { MenuDesktop, MenuMobile } from '@molecules/Menu';
import { Cart } from '@organisms/Cart';
import { SearchBar } from '@organisms/SearchBar';

interface Props {
  menuLinks: Array<{ text: string; href: string }>;
}

export const Header = ({ menuLinks }: Props) => {
  return (
    <>
      <Box
        as="header"
        padding={'5'}
        backgroundColor={'white'}
        borderBottom={'1px solid'}
        borderColor={'gray.100'}
        position={'sticky'}
        top={0}
        zIndex={999}
      >
        <Container
          maxWidth={'container.xl'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} alignItems={'center'}>
            <MenuMobile menuLinks={menuLinks} />
            <Logo />
          </Box>
          <SearchBar display={{ base: 'none', lg: 'block' }} />
          <Box display={'flex'} alignItems={'center'} gap={'2'}>
            <Login />
            <Cart />
          </Box>
        </Container>
      </Box>

      <MenuDesktop menuLinks={menuLinks} />

      <Container
        maxWidth={'container.xl'}
        marginTop={'3.5'}
        display={{ base: 'flex', lg: 'none' }}
        justifyContent={'center'}
        justifyItems={'center'}
      >
        <SearchBar />
      </Container>
    </>
  );
};
