import { Box, Link } from '@chakra-ui/react';
import { config } from '@config/store';
import NextLink from 'next/link';

export const Logo = () => {
  return (
    <Box
      data-testid="logo"
      as="div"
      color={'blackAlpha.700'}
      fontSize={'lg'}
      fontWeight={'bold'}
    >
      <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
        {config.base.storeName}
      </Link>
    </Box>
  );
};
