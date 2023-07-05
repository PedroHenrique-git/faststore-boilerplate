import { Heading, Text, VStack } from '@chakra-ui/react';
import { BiErrorCircle } from 'react-icons/bi';

interface Props {
  title?: string;
  message?: string;
}

export const Error = ({ message, title }: Props) => {
  return (
    <VStack
      as={'section'}
      direction={['column', 'row']}
      spacing="24px"
      height={'100vh'}
      justifyContent={'center'}
    >
      <BiErrorCircle size={60} />
      <Heading as={'h2'} textAlign={'center'} color={'gray.700'}>
        {title ?? 'Ooops, something went wrong!'}
      </Heading>
      <Text textAlign={'center'} color={'gray.700'}>
        {message ??
          'Try to refresh this page or feel free to contact us if the problem persists.'}
      </Text>
    </VStack>
  );
};
