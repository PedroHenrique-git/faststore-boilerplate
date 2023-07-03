import { Flex, List, ListItem, Skeleton } from '@chakra-ui/react';

export const AddressesListSkeleton = () => {
  return (
    <>
      <Flex
        alignItems={{ base: 'flex-start', lg: 'center' }}
        justifyContent={{ base: 'flex-start', lg: 'space-between' }}
        flexDirection={{ base: 'column', lg: 'row' }}
        margin="2rem 0"
      >
        <Skeleton
          w={'30%'}
          h={'30px'}
          marginBottom={{ base: '2rem', lg: '0' }}
        />
        <Skeleton w={'15%'} h={'30px'} />
      </Flex>

      <List>
        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Skeleton w={'30%'} h={'30px'} />

            <Flex
              gap={'1.5'}
              flexDirection={'column'}
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
              w={'30%'}
            >
              <Skeleton w={'30%'} h={'25px'} />
              <Skeleton w={'30%'} h={'25px'} />
            </Flex>
          </Flex>
        </ListItem>
        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Skeleton w={'30%'} h={'30px'} />

            <Flex
              gap={'1.5'}
              flexDirection={'column'}
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
              w={'30%'}
            >
              <Skeleton w={'30%'} h={'25px'} />
              <Skeleton w={'30%'} h={'25px'} />
            </Flex>
          </Flex>
        </ListItem>
        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Skeleton w={'30%'} h={'30px'} />

            <Flex
              gap={'1.5'}
              flexDirection={'column'}
              justifyContent={'flex-end'}
              alignItems={'flex-end'}
              w={'30%'}
            >
              <Skeleton w={'30%'} h={'25px'} />
              <Skeleton w={'30%'} h={'25px'} />
            </Flex>
          </Flex>
        </ListItem>
      </List>
    </>
  );
};
