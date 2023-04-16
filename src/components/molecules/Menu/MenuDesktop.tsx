import { MenuItem } from '@atoms/MenuItem';
import { Box, Container, List, useMediaQuery } from '@chakra-ui/react';

interface Props {
  menuLinks: Array<{ text: string; href: string }>;
}

export const MenuDesktop = ({ menuLinks = [] }: Props) => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)', {
    ssr: true,
    fallback: false,
  });

  return (
    <Box
      as="nav"
      width={'100%'}
      padding={'10px 20px'}
      background={'gray.100'}
      display={isLargerThan992 ? 'flex' : 'none'}
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
