import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import checkout from '@services/checkout';
import safedata from '@services/safedata';
import { Address } from '@services/safedata/types';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { userData } from 'src/sdk/state';
import { FormSchema } from './schema';

type FormValues = Omit<Address, 'id'>;

export const AddressForm = () => {
  const { push } = useRouter();
  const toast = useToast();
  const [userContent, setUserData] = useAtom(userData);
  const queryClient = useQueryClient();

  const { selectedAddress } = userContent;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    values: {
      addressName: selectedAddress?.addressName ?? '',
      city: selectedAddress?.city ?? '',
      complement: selectedAddress?.complement ?? '',
      country: selectedAddress?.country ?? '',
      geoCoordinates: selectedAddress?.geoCoordinates ?? [],
      neighborhood: selectedAddress?.neighborhood ?? '',
      number: selectedAddress?.number ?? '',
      postalCode: selectedAddress?.postalCode ?? '',
      reference: selectedAddress?.reference ?? '',
      state: selectedAddress?.state ?? '',
      street: selectedAddress?.street ?? '',
      userId: selectedAddress?.userId ?? '',
    },
  });

  const postalCode = watch('postalCode') ?? '';

  const { isLoading: isLoadingAddress } = useQuery({
    queryKey: [`postal-code-${postalCode}`, postalCode],
    queryFn: () => checkout.getAddressByPostalCode(postalCode),
    enabled: Boolean(postalCode),
    onSuccess: ({ data }) => {
      setValue('city', data.city);
      setValue('complement', data.complement);
      setValue('country', data.country);
      setValue('geoCoordinates', data.geoCoordinates);
      setValue('neighborhood', data.neighborhood);
      setValue('number', data.number);
      setValue('postalCode', data.postalCode);
      setValue('reference', data.reference);
      setValue('state', data.state);
      setValue('street', data.street);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: 'address-update-create',
    mutationFn: async (values: FormValues) => {
      if (selectedAddress) {
        await safedata.updateAddress(selectedAddress.id ?? '', {
          ...values,
          addressName: `address-${values.city}`,
        });

        setUserData({ ...userContent, selectedAddress: null });
      } else {
        await safedata.createAddress({
          ...values,
          addressName: `address-${values.city}`,
        });
      }

      await queryClient.refetchQueries('my-account-user-addresses');
    },
    onSuccess() {
      push('/myaccount/addresses');
    },
    onError() {
      toast({
        status: 'error',
        description: 'There was an error registering the address',
        position: 'bottom-right',
        isClosable: true,
        duration: 2000,
      });
    },
  });

  return (
    <Box margin={'2rem auto'} maxW={'600px'}>
      <Heading size="md" marginBottom={'2rem'} textAlign={'center'}>
        {selectedAddress ? 'Update address' : 'Create address'}
      </Heading>

      <chakra.form onSubmit={handleSubmit((values) => mutate(values))}>
        <Stack spacing="4" align={'center'}>
          <FormControl isInvalid={!!errors.city}>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              disabled={isLoadingAddress}
              {...register('city')}
            />
            {errors.city && (
              <FormErrorMessage>{errors.city.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.complement}>
            <FormLabel>Complement</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              disabled={isLoadingAddress}
              {...register('complement')}
            />
            {errors.complement && (
              <FormErrorMessage>{errors.complement.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.neighborhood}>
            <FormLabel>Neighborhood</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              disabled={isLoadingAddress}
              {...register('neighborhood')}
            />
            {errors.neighborhood && (
              <FormErrorMessage>{errors.neighborhood.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.postalCode}>
            <FormLabel>Postal code</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              {...register('postalCode')}
            />
            {errors.postalCode && (
              <FormErrorMessage>{errors.postalCode.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              disabled={isLoadingAddress}
              {...register('state')}
            />
            {errors.state && (
              <FormErrorMessage>{errors.state.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.street}>
            <FormLabel>Street</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              disabled={isLoadingAddress}
              {...register('street')}
            />
            {errors.street && (
              <FormErrorMessage>{errors.street.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.number}>
            <FormLabel>Number</FormLabel>
            <Input
              type="text"
              placeholder={'example'}
              disabled={isLoadingAddress}
              {...register('number')}
            />
            {errors.number && (
              <FormErrorMessage>{errors.number.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            marginTop={'1rem'}
            type="submit"
            isLoading={isLoading || isLoadingAddress}
          >
            Save
          </Button>
        </Stack>
      </chakra.form>
    </Box>
  );
};
