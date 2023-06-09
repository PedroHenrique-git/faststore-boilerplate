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
import { useSession } from 'src/sdk/session';
import { useLoginContext } from '../Login';
import { CodeFormSchema } from './schema';

interface FormValues {
  code: string;
}

export const CodeForm = () => {
  const {
    session: { country, postalCode },
  } = useSession();

  const { changeLoginOption, userEmail, authenticationToken, reset } =
    useLoginContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(CodeFormSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: 'send-access-key',
    mutationFn: async (values: FormValues) => {
      await axios.post(
        '/api/auth/accesskey/validate',
        {
          code: values.code,
          email: userEmail,
          authenticationToken,
        },
        { withCredentials: true },
      );

      await axios.post('/api/session/create', {
        country: country,
        postalCode: postalCode,
      });
    },
    onSettled() {
      reset();
    },
  });

  return (
    <chakra.form onSubmit={handleSubmit((values) => mutate(values))}>
      <FormControl isInvalid={!!errors.code}>
        <Input type="text" placeholder={'123456'} {...register('code')} />
        {errors.code && (
          <FormErrorMessage>{errors.code.message}</FormErrorMessage>
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
