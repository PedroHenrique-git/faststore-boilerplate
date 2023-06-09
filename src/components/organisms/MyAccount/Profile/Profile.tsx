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
import { IStorePerson } from '@generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import SafeData from '@services/safedata';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import getFilledFields from 'src/sdk/helpers/getFilledFields';
import { useSession } from 'src/sdk/session';
import { userData } from 'src/sdk/state';
import { MyAccountMenu } from '../MyAccountMenu';
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
  const [userContent, setUserData] = useAtom(userData);

  const { session, set } = useSession();

  const { person } = session;

  const initialEmail = person?.email
    ? person.email
    : userContent.user.email ?? '';

  const initialFistName = person?.givenName
    ? person.givenName
    : userContent.user.firstName ?? '';

  const initialLastName = person?.familyName
    ? person.familyName
    : userContent.user.lastName ?? '';

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
      birthDate: userContent.user?.birthDate?.split('T')[0] ?? '',
      phone: userContent.user.phone ?? '',
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: 'edit-profile',
    mutationFn: async (values: FormValues) => {
      const editedUser = await SafeData.updateUserData({
        ...getFilledFields({
          email: values.email,
          birthDate: values.birthDate,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        }),
        userId: person?.id ?? userContent.user.userId,
      });

      setUserData({
        ...userContent,
        user: {
          ...userContent.user,
          ...getFilledFields(editedUser),
        },
      });

      await set({
        ...session,
        person: {
          ...session.person,
          ...getFilledFields<IStorePerson>({
            email: editedUser.email ?? '',
            familyName: editedUser.lastName ?? '',
            givenName: editedUser.firstName ?? '',
            id: editedUser.userId ?? '',
          }),
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
    <>
      <MyAccountMenu />

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
                  <FormErrorMessage>
                    {errors.firstName.message}
                  </FormErrorMessage>
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
                  <FormErrorMessage>
                    {errors.birthDate.message}
                  </FormErrorMessage>
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
    </>
  );
};
