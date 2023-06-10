import { Heading, VStack } from '@chakra-ui/react';
import { useLoginContext } from '../Login';
import { CodeForm } from './CodeForm';
import { EmailForm } from './EmailForm';

export const AccessKey = () => {
  const { authenticationToken, userEmail, selectedLogin } = useLoginContext();

  const shouldShowCodeForm =
    authenticationToken && userEmail && selectedLogin === 'accesskey';

  return (
    <VStack spacing={'4'}>
      <Heading
        as={'h3'}
        color={'blackAlpha.700'}
        fontSize={'lg'}
        fontWeight={'bold'}
      >
        Receive access code by email
      </Heading>

      {shouldShowCodeForm ? <CodeForm /> : <EmailForm />}
    </VStack>
  );
};
