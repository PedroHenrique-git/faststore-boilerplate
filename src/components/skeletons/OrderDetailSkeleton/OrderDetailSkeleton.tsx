import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  List,
  ListItem,
  Skeleton,
  Stack,
  StackDivider,
} from '@chakra-ui/react';

export const OrderDetailSkeleton = () => {
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

      <Box as="section">
        <Skeleton w={'30%'} h={'20px'} marginBottom={'2rem'} />

        <Flex
          gap={'3'}
          justifyContent={'space-between'}
          flexWrap={{ base: 'wrap', lg: 'nowrap' }}
          as={'section'}
        >
          {/** Address  */}
          <Card w={{ base: '100%', lg: 'calc(100%/3)' }} as={'section'}>
            <CardHeader>
              <Skeleton w={'30%'} h={'20px'} />
            </CardHeader>

            <CardBody>
              <Box>
                <Skeleton w={'100%'} h={'20px'} marginBottom={'1'} />
                <Skeleton w={'100%'} h={'20px'} marginBottom={'1'} />
              </Box>
            </CardBody>
          </Card>

          {/** Payment method  */}
          <Card w={{ base: '100%', lg: 'calc(100%/3)' }} as={'section'}>
            <CardHeader>
              <Skeleton w={'30%'} h={'20px'} />
            </CardHeader>

            <CardBody>
              <Skeleton w={'100%'} h={'20px'} marginBottom={'1'} />
              <Skeleton w={'100%'} h={'20px'} marginBottom={'1'} />
              <Skeleton w={'100%'} h={'20px'} marginBottom={'1'} />
            </CardBody>
          </Card>

          {/** Summary  */}
          <Card w={{ base: '100%', lg: 'calc(100%/3)' }} as={'section'}>
            <CardHeader>
              <Skeleton w={'30%'} h={'20px'} />
            </CardHeader>

            <CardBody>
              <List>
                <Stack divider={<StackDivider />} spacing="2">
                  <ListItem display={'flex'} justifyContent={'space-between'}>
                    <Skeleton w={'20%'} h={'20px'} />
                    <Skeleton w={'20%'} h={'20px'} />
                  </ListItem>

                  <ListItem display={'flex'} justifyContent={'space-between'}>
                    <Skeleton w={'20%'} h={'20px'} />
                    <Skeleton w={'20%'} h={'20px'} />
                  </ListItem>

                  <ListItem display={'flex'} justifyContent={'space-between'}>
                    <Skeleton w={'20%'} h={'20px'} />
                    <Skeleton w={'20%'} h={'20px'} />
                  </ListItem>

                  <ListItem display={'flex'} justifyContent={'space-between'}>
                    <Skeleton w={'20%'} h={'20px'} />
                    <Skeleton w={'20%'} h={'20px'} />
                  </ListItem>
                </Stack>
              </List>
            </CardBody>
          </Card>
        </Flex>
      </Box>

      <Box as="section" margin={'2rem 0'}>
        <Skeleton w={'15%'} h={'20px'} marginBottom={'3'} />
        <Skeleton w={'15%'} h={'20px'} />
      </Box>

      <Box as="section" margin={'2rem 0'}>
        <Skeleton w={'15%'} h={'20px'} marginBottom={'3'} />

        {/** Products List  */}
        <List>
          <Stack divider={<StackDivider />} spacing="2">
            <ListItem w={'100%'}>
              <Flex w={'100%'} gap={'2'}>
                <Skeleton w={'80px'} h={'80px'} />

                <Flex flexDirection={'column'} w={'100%'}>
                  <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                  <Skeleton w={'50%'} h={'20px'} />
                </Flex>
              </Flex>
            </ListItem>

            <ListItem w={'100%'}>
              <Flex w={'100%'} gap={'2'}>
                <Skeleton w={'80px'} h={'80px'} />

                <Flex flexDirection={'column'} w={'100%'}>
                  <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                  <Skeleton w={'50%'} h={'20px'} />
                </Flex>
              </Flex>
            </ListItem>

            <ListItem w={'100%'}>
              <Flex w={'100%'} gap={'2'}>
                <Skeleton w={'80px'} h={'80px'} />

                <Flex flexDirection={'column'} w={'100%'}>
                  <Skeleton w={'100%'} h={'20px'} marginBottom={'2'} />
                  <Skeleton w={'50%'} h={'20px'} />
                </Flex>
              </Flex>
            </ListItem>
          </Stack>
        </List>
      </Box>
    </Box>
  );
};
