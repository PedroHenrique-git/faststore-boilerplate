import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  chakra,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLoginContext } from '../Login';
import { EmailFormSchema } from './schema';

interface FormValues {
  email: string;
}

export const EmailForm = () => {
  const { changeLoginOption, setAuthenticationToken, setUserEmail, reset } =
    useLoginContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(EmailFormSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: 'send-access-key',
    mutationFn: async (values: FormValues) => {
      const {
        data: { authenticationToken },
      } = await axios.get<LoginStart>('/api/auth/start', {
        withCredentials: true,
      });

      setAuthenticationToken(authenticationToken ?? '');
      setUserEmail(values.email);

      await axios.post('/api/auth/accesskey/send', {
        email: values.email,
        authenticationToken,
      });
    },
  });

  return (
    <chakra.form onSubmit={handleSubmit((values) => mutate(values))}>
      <FormControl isInvalid={!!errors.email}>
        <Input
          type="email"
          placeholder={'email@example.com'}
          {...register('email')}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>

      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={'4'}
      >
        <Button
          onClick={() => {
            changeLoginOption(null);
            reset();
          }}
        >
          Back
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Send
        </Button>
      </Flex>
    </chakra.form>
  );
};
