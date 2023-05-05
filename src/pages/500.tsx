import { Heading, Text, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

function Error() {
  return (
    <>
      <NextSeo noindex nofollow />

      <VStack
        as={'section'}
        direction={['column', 'row']}
        spacing="24px"
        height={'100vh'}
        justifyContent={'center'}
      >
        <Heading as={'h1'} textAlign={'center'} color={'gray.700'}>
          500
        </Heading>
        <Heading as={'h2'} textAlign={'center'} color={'gray.700'}>
          Ooops, something went wrong!
        </Heading>
        <Text textAlign={'center'} color={'gray.700'}>
          Try to refresh this page or feel free to contact us if the problem
          persists.
        </Text>
      </VStack>
    </>
  );
}

export default Error;
