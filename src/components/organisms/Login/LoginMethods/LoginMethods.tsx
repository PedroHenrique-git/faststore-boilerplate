import { Button, Heading, VStack } from '@chakra-ui/react';
import { AccessKey } from '../AccessKey';
import { useLoginContext } from '../Login/Login';

export const LoginMethods = () => {
  const { selectedLogin, changeLoginOption } = useLoginContext();

  if (selectedLogin === 'accesskey') {
    return <AccessKey />;
  }

  return (
    <VStack marginTop={'10'} spacing={'4'}>
      <Heading
        as={'h3'}
        color={'blackAlpha.700'}
        fontSize={'lg'}
        fontWeight={'bold'}
      >
        Choose an option to enter
      </Heading>
      <Button onClick={() => changeLoginOption('accesskey')}>
        Receive access code by email
      </Button>
      <Button onClick={() => changeLoginOption('email-password')}>
        Login with email and password
      </Button>
    </VStack>
  );
};
