import { MenuItem } from '@atoms/MenuItem';
import { Box, Container, List } from '@chakra-ui/react';

interface Props {
  menuLinks: Array<{ text: string; href: string }>;
}

export const MenuDesktop = ({ menuLinks = [] }: Props) => {
  return (
    <Box
      as="nav"
      width={'100%'}
      padding={'10px 20px'}
      background={'gray.100'}
      display={{ base: 'none', lg: 'flex' }}
    >
      <Container maxW={'container.xl'}>
        <List display={'flex'} gap={'10'}>
          {menuLinks.map(({ href, text }) => (
            <MenuItem key={text} href={href} text={text} />
          ))}
        </List>
      </Container>
    </Box>
  );
};
