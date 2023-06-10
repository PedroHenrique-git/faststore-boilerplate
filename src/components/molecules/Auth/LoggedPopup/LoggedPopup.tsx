import {
  Button,
  Link,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import Auth from '@services/auth/Auth';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { useSession } from 'src/sdk/session';

export const LoggedPopup = () => {
  const toast = useToast();
  const { set, session } = useSession();
  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: 'logout',
    mutationFn: async () => {
      await Auth.logout();
    },
    onError() {
      toast({
        status: 'error',
        description: 'There was an error logging out, please try again later.',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
    onSuccess() {
      set({
        ...session,
        person: null,
      });

      push('/');
    },
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          sx={{
            background: 'transparent',
            _hover: { background: 'transparent' },
            _active: { background: 'transparent' },
            _focus: { background: 'transparent' },
          }}
        >
          <AiOutlineUser size={30} color="#000000A3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody padding={'5'}>
          <List>
            <ListItem>
              <Link as={NextLink} href="/myaccount" fontSize={'medium'}>
                My account
              </Link>
            </ListItem>
            <ListItem
              borderTop={'1px'}
              borderColor={'gray.200'}
              paddingTop={'2'}
              marginTop={'4'}
            >
              <Button
                sx={{
                  background: 'transparent',
                  _hover: {
                    background: 'transparent',
                    textDecoration: 'underline',
                  },
                  _active: { background: 'transparent' },
                  _focus: { background: 'transparent' },
                }}
                onClick={() => mutate()}
                fontSize={'medium'}
                fontWeight={'light'}
                color={'gray.900'}
                padding={0}
              >
                Logout
              </Button>
            </ListItem>
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
