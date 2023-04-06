import { Logo } from '@atoms/Logo';
import { Box, Container } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box
      as="header"
      padding={'5'}
      backgroundColor={'white'}
      borderBottom={'1px solid'}
      borderColor={'gray.100'}
      marginBottom={'50'}
      position={'sticky'}
      top={0}
    >
      <Container maxWidth={'container.xl'}>
        <Logo />
      </Container>
    </Box>
  );
};
