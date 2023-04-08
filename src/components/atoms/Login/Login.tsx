import { Link } from '@chakra-ui/react';
import { config } from '@config/store';
import NextLink from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';

export const Login = () => {
  const loginUrl = config.base.useLocalLogin
    ? '/login'
    : config.base.externalUrls.loginUrl;

  return (
    <Link
      as={NextLink}
      href={loginUrl}
      display={'flex'}
      alignItems={'flex-end'}
      data-testid="login"
    >
      <AiOutlineUser size={30} color="#000000A3" />
    </Link>
  );
};
