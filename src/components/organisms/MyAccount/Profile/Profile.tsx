import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import SafeData from '@services/safedata/SafeData';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSession } from 'src/sdk/session';
import { userData } from 'src/sdk/state';
import { FormSchema } from './schema';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  phone: string;
}

export const Profile = () => {
  const toast = useToast();
  const [edit, setEdit] = useState(false);
  const [{ user }, setUserData] = useAtom(userData);

  const { session, set } = useSession();

  const { person } = session;

  const initialEmail = person?.email ? person.email : user.email ?? '';

  const initialFistName = person?.givenName
    ? person.givenName
    : user.firstName ?? '';

  const initialLastName = person?.familyName
    ? person.familyName
    : user.lastName ?? '';

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
    values: {
      email: initialEmail,
      firstName: initialFistName,
      lastName: initialLastName,
      birthDate: user?.birthDate?.split('T')[0] ?? '',
      phone: user.phone ?? '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: 'edit-profile',
    mutationFn: async (values: FormValues) => {
      const editedUser = await SafeData.updateUserData(person?.id ?? '', {
        email: values.email,
        birthDate: values.birthDate,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        userId: person?.id ?? user.userId,
      });

      setUserData({
        user: editedUser,
      });

      set({
        ...session,
        person: {
          email: editedUser.email ?? '',
          familyName: editedUser.lastName ?? '',
          givenName: editedUser.firstName ?? '',
          id: editedUser.userId ?? '',
        },
      });
    },
    onSettled() {
      setEdit(false);
    },
    onError() {
      toast({
        status: 'error',
        description:
          'There was an error editing your details, please try again later',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Profile</Heading>
      </CardHeader>

      <CardBody>
        <chakra.form onSubmit={handleSubmit((values) => mutate(values))}>
          <Stack divider={<StackDivider />} spacing="4">
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                placeholder={'example'}
                readOnly={!edit}
                {...register('firstName')}
              />
              {errors.firstName && (
                <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                placeholder={'example'}
                readOnly={!edit}
                {...register('lastName')}
              />
              {errors.lastName && (
                <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder={'example@email.com'}
                readOnly
                {...register('email')}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                placeholder={'(22) 2222-3333'}
                readOnly={!edit}
                {...register('phone')}
              />
              {errors.phone && (
                <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.birthDate}>
              <FormLabel>Birth date</FormLabel>
              <Input
                type="date"
                placeholder={'10/11/1990'}
                readOnly={!edit}
                {...register('birthDate')}
              />
              {errors.birthDate && (
                <FormErrorMessage>{errors.birthDate.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>

          {edit && (
            <Button marginTop={'1rem'} type="submit" isLoading={isLoading}>
              Save
            </Button>
          )}
        </chakra.form>

        {!edit && (
          <Button onClick={() => setEdit(true)} marginTop={'1rem'}>
            Edit
          </Button>
        )}
      </CardBody>
    </Card>
  );
};
