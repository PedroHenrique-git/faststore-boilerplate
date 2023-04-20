import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react';
import {
  SubscribeNewsletterMutation,
  SubscribeNewsletterMutationVariables,
} from '@generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { SubscribeNewsletter } from 'src/graphql/mutations/SubscribeNewsletter';
import { graphqlClient } from 'src/server/graphql';
import { FormSchema } from './schema';

interface FormValues {
  name: string;
  email: string;
}

interface Props {
  icon: { alt: string; icon: string };
  title: string;
  description: string;
  'email-input-label': string;
  'name-input-label': string;
  'subscribe-button-label': string;
}

export const Newsletter = (props: Props) => {
  const toast = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
  });

  const { description, title } = props;

  const { mutate, isLoading } = useMutation({
    mutationKey: 'newsletter',
    mutationFn: (values: FormValues) => {
      return graphqlClient.request<
        SubscribeNewsletterMutation,
        SubscribeNewsletterMutationVariables
      >(SubscribeNewsletter, { data: values });
    },
    onError() {
      toast({
        status: 'error',
        description:
          'There was an error registering for the newsletter, please try again in a few minutes',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
    onSuccess() {
      toast({
        status: 'success',
        description: 'Registration done successfully',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });

      reset();
    },
  });

  return (
    <Flex
      as="section"
      flexWrap={{ base: 'wrap', lg: 'nowrap' }}
      padding={'1.5rem'}
      margin={'3rem 0'}
      background={'gray.100'}
      gap={'10'}
    >
      <Flex direction={'column'} w={{ base: '100%', lg: '50%' }}>
        <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'left'}>
          {title}
        </Text>
        <Text fontSize={'1xl'} textAlign={'left'}>
          {description}
        </Text>
      </Flex>
      <chakra.form
        w={{ base: '100%', lg: '50%' }}
        onSubmit={handleSubmit((values) => mutate(values))}
      >
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>{props['name-input-label']}</FormLabel>
          <Input type="text" placeholder={'example'} {...register('name')} />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email} marginTop={'4'}>
          <FormLabel>{props['email-input-label']}</FormLabel>
          <Input
            type="text"
            placeholder={'example@email.com'}
            {...register('email')}
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          borderRadius={0}
          padding={'10px'}
          background={'blackAlpha.500'}
          color={'white'}
          w={'min(100%, 160px)'}
          _hover={{ textDecoration: 'none', opacity: '.5' }}
          transition={'opacity 300ms ease-in-out'}
          marginTop={'4'}
          isLoading={isLoading}
        >
          {props['subscribe-button-label']}
        </Button>
      </chakra.form>
    </Flex>
  );
};
