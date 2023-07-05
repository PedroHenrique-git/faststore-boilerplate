import { Box, Flex, List, ListItem, Skeleton } from '@chakra-ui/react';

export const OrdersListSkeleton = () => {
  return (
    <Box as="section" minH={'100vh'}>
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
      </Flex>

      <List>
        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>

        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>

        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>

        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>

        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>

        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>

        <ListItem
          boxShadow={'base'}
          borderRadius="xl"
          padding={'5'}
          marginBottom={'4'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={{ base: '4', lg: '0' }}
            flexWrap={{ base: 'wrap', lg: 'nowrap' }}
            w={'100%'}
          >
            <Flex gap={'2'} justifyContent={'space-between'} w={'20%'}>
              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>

              <Box w={'100%'}>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                <Skeleton w={'100%'} h={'20px'} />
              </Box>
            </Flex>

            <Flex flexDirection={'column'} w={'20%'} gap={'2'}>
              <Skeleton w={'100%'} h={'20px'} />
              <Skeleton w={'100%'} h={'20px'} />
            </Flex>
          </Flex>
        </ListItem>
      </List>
    </Box>
  );
};
