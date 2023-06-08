import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  chakra,
} from '@chakra-ui/react';
import { useState } from 'react';
import { fetchApi } from 'src/sdk/helpers/fetchApi';

function Login() {
  const [email, setEmail] = useState('');

  return (
    <VStack>
      <chakra.form
        onSubmit={async (e) => {
          e.preventDefault();

          const { authenticationToken } =
            (await fetchApi<Record<string, unknown>>('/api/auth/start', {
              credentials: 'include',
            })) ?? {};

          const auth = await fetchApi<Record<string, unknown>>(
            '/api/auth/accesskey/send',
            {
              method: 'POST',
              body: JSON.stringify({
                email,
                authenticationToken,
              }),
              credentials: 'include',
            },
          );

          console.log(auth);
        }}
      >
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
        <Button type="submit">send</Button>
      </chakra.form>
    </VStack>
  );
}

export default Login;
