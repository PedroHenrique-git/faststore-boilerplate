import { Button, Flex, List, ListItem, Text, VStack } from '@chakra-ui/react';
import safedata from '@services/safedata';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { userData } from 'src/sdk/state';
import { MyAccountMenu } from '../MyAccountMenu';

export const Addresses = () => {
  const queryClient = useQueryClient();
  const [userContent, setUserData] = useAtom(userData);
  const { push } = useRouter();

  const { addresses } = userContent;

  const { mutate, isLoading } = useMutation({
    mutationKey: 'delete-address',
    mutationFn: async (id: string) => {
      await safedata.deleteAddress(id);
      await queryClient.refetchQueries('my-account-user-addresses');
    },
  });

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

                  <Flex gap={'1.5'} flexDirection={'column'}>
                    <Button
                      boxShadow={'none'}
                      onClick={() => {
                        setUserData({
                          ...userContent,
                          selectedAddress: address,
                        });

                        push('/myaccount/addresses/edit');
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      boxShadow={'none'}
                      onClick={() => mutate(address.id ?? '')}
                      disabled={isLoading}
                    >
                      Delete
                    </Button>
                  </Flex>
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
