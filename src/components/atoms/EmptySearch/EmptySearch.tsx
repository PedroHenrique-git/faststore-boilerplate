import { Heading, VStack } from '@chakra-ui/react';
import { MdOutlineSearchOff } from 'react-icons/md';

export const EmptySearch = () => {
  return (
    <VStack
      as="section"
      direction={['column', 'row']}
      spacing="10px"
      height={'100vh'}
      justifyContent={'center'}
    >
      <MdOutlineSearchOff size={70} />
      <Heading
        as={'h1'}
        textAlign={'center'}
        color={'gray.700'}
        fontSize={'2xl'}
      >
        Sorry we could not find any product
      </Heading>
    </VStack>
  );
};
