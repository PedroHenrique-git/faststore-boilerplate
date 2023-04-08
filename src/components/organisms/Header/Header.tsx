import { Login } from '@atoms/Login';
import { Logo } from '@atoms/Logo';
import { Box, Container, useMediaQuery } from '@chakra-ui/react';
import { MenuDesktop, MenuMobile } from '@molecules/Menu';
import { Cart } from '@organisms/Cart/Cart';
import { SearchBar } from '@organisms/SearchBar';

interface Props {
  menuLinks: Array<{ text: string; href: string }>;
}

export const Header = ({ menuLinks }: Props) => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)', {
    ssr: true,
    fallback: false,
  });

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
        zIndex={99}
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
          {isLargerThan992 && <SearchBar />}
          <Box display={'flex'} alignItems={'center'} gap={'2'}>
            <Login />
            <Cart />
          </Box>
        </Container>
      </Box>
      <MenuDesktop menuLinks={menuLinks} />

      {!isLargerThan992 && (
        <Container
          maxWidth={'container.xl'}
          marginTop={'3.5'}
          display={'flex'}
          justifyContent={'center'}
          justifyItems={'center'}
        >
          <SearchBar />
        </Container>
      )}
    </>
  );
};
