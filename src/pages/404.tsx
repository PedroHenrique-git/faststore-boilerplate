import { Heading, Text, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

function NotFound() {
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
          404
        </Heading>
        <Heading as={'h2'} textAlign={'center'} color={'gray.700'}>
          Ooops, page not found!
        </Heading>
        <Text textAlign={'center'} color={'gray.700'}>
          Sorry, but the request page is not found.
        </Text>
      </VStack>
    </>
  );
}

export default NotFound;
