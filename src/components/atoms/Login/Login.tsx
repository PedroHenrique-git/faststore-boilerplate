import { Link, Text } from '@chakra-ui/react';
import { config } from '@config/store';
import NextLink from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { useSession } from 'src/sdk/session';

export const Login = () => {
  const {
    session: { person },
  } = useSession();

  const loginUrl = config.base.useLocalLogin
    ? '/login'
    : config.base.externalUrls.loginUrl;

  return (
    <Link
      as={NextLink}
      href={loginUrl}
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <AiOutlineUser size={30} color="#000000A3" />

      {person?.email && (
        <Text
          textOverflow={'ellipsis'}
          noOfLines={2}
          maxW={'160px'}
          fontSize={'sm'}
          display={{ base: 'none', lg: 'block' }}
          overflow={'hidden'}
          sx={{ whiteSpace: 'nowrap' }}
        >
          {person?.email}
        </Text>
      )}
    </Link>
  );
};
