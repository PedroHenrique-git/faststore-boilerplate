import { Button, Flex, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { userData } from 'src/sdk/state';
import { MyAccountMenu } from '../MyAccountMenu';

export const Addresses = () => {
  const [userContent, setUserData] = useAtom(userData);
  const { push } = useRouter();

  const { addresses } = userContent;

  return (
    <>
      <Flex
        alignItems={{ base: 'flex-start', lg: 'center' }}
        justifyContent={{ base: 'flex-start', lg: 'space-between' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        marginBottom={{ base: '2rem', lg: '0' }}
      >
        <MyAccountMenu />

        <Button onClick={() => push('/myaccount/addresses/new')}>
          Create a new address
        </Button>
      </Flex>

      {addresses.length ? (
        <>
          <List>
            {addresses.map((address) => (
              <ListItem
                key={address.id}
                boxShadow={'base'}
                borderRadius="xl"
                padding={'5'}
                marginBottom={'4'}
              >
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Text color={'GrayText'}>
                    {address.street}, {address.neighborhood} <br />
                    {address.city} - {address.state} <br />
                    {address.postalCode}
                  </Text>

                  <Button
                    boxShadow={'none'}
                    onClick={() =>
                      setUserData({ ...userContent, selectedAddress: address })
                    }
                  >
                    Edit
                  </Button>
                </Flex>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <VStack
            as={'section'}
            direction={['column', 'row']}
            spacing="24px"
            height={'100vh'}
            justifyContent={'center'}
          >
            <Text
              textAlign={'center'}
              color={'gray.700'}
              fontWeight={'bold'}
              fontSize={'2xl'}
            >
              No address found.
            </Text>
          </VStack>
        </>
      )}
    </>
  );
};
