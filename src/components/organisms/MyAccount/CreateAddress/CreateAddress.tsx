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
import MasterDataService from '@services/masterdata';
import { Address } from '@services/safedata/types';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useSession } from 'src/sdk/session';
import { FormSchema } from './schema';

type FormValues = Omit<Address, 'id'>;

const masterdata = new MasterDataService('AD');

export const CreateAddress = () => {
  const {
    session: { person },
  } = useSession();
  const { push } = useRouter();
  const toast = useToast();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
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
    mutationKey: 'create-address',
    mutationFn: async (values: FormValues) => {
      await masterdata.create({
        ...values,
        userId: person?.id,
        addressName: `address-${values.city}`,
      });
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
        Create address
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
