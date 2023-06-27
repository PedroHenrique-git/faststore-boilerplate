import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Auth from '@services/auth';
import Session from '@services/session';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSession } from 'src/sdk/session';
import { useLoginContext } from '../Login';
import { CodeFormSchema } from './schema';

interface FormValues {
  code: string;
}

export const CodeForm = () => {
  const toast = useToast();
  const { push } = useRouter();
  const { session, set } = useSession();

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
      await Auth.validateAccessKey({
        accessKey: values.code,
        email: userEmail,
        authenticationToken,
      });

      await Session.create({
        country: session.country,
        postalCode: session.postalCode ?? '',
      });
    },
    onError() {
      toast({
        status: 'error',
        description:
          'There was an error entering your login, please try again later.',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
    onSuccess() {
      Session.get().then((vtexSession) => {
        set({
          ...session,
          person: {
            id: vtexSession?.namespaces?.profile?.id?.value ?? '',
            email: vtexSession?.namespaces?.profile?.email?.value ?? '',
            familyName: vtexSession?.namespaces?.profile?.lastName?.value ?? '',
            givenName: vtexSession?.namespaces?.profile?.firstName?.value ?? '',
          },
        });
      });

      push('/');
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
