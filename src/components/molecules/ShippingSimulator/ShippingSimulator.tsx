import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import { IShippingItem } from '@generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { getPostalCodeRegex } from 'src/sdk/helpers/getCurrentPostalCodeRegex';
import { useFormatPrice } from 'src/sdk/product';
import { useSession } from 'src/sdk/session';
import { useShipping } from 'src/sdk/shipping';
import { FormSchema } from './schema';

interface Sla {
  carrier: string;
  localizedEstimates: string;
  price: number;
  shippingEstimate: string;
}

interface Props {
  items: IShippingItem[];
}

interface FormValues {
  postalCode: string;
}

export const ShippingSimulator = ({ items }: Props) => {
  const { formatter } = useFormatPrice();

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    mode: 'onChange',
  });

  const {
    session: { country },
  } = useSession();

  const { data, isError, isSuccess, isLoading, refetch } = useShipping({
    items,
    country,
    postalCode: getValues('postalCode'),
  });

  const slas =
    data?.shipping?.logisticsInfo?.reduce<Sla[]>((acc, current) => {
      return current?.slas ? acc.concat(current.slas as Sla[]) : [...acc];
    }, []) ?? [];

  return (
    <Flex as="section" flexDirection={'column'} gap={'3'} w={'100%'}>
      <Heading size="md">Shipping</Heading>
      <chakra.form onSubmit={handleSubmit(() => refetch())}>
        <FormControl isInvalid={!!errors.postalCode}>
          <InputGroup>
            <Input
              as={InputMask}
              type="text"
              placeholder={'Postal code'}
              mask={getPostalCodeRegex().formatter}
              {...register('postalCode')}
            />
            <InputRightAddon padding={0}>
              <Button
                type="submit"
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                isLoading={isLoading}
              >
                Apply
              </Button>
            </InputRightAddon>
          </InputGroup>
          {errors.postalCode && (
            <FormErrorMessage>{errors.postalCode.message}</FormErrorMessage>
          )}
        </FormControl>
      </chakra.form>
      {isSuccess && !!slas.length && (
        <TableContainer
          css={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Table>
            <Thead>
              <Tr>
                <Th>Carrier</Th>
                <Th>Shipping estimate</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {slas?.map((sla) => (
                <Tr key={sla.carrier}>
                  <Td>{sla.carrier}</Td>
                  <Td>{sla.shippingEstimate}</Td>
                  <Td>{formatter({ price: sla.price })}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {isError && (
        <Text color={'red.500'}>
          There was an error calculating the delivery time, check the zip code
          entered
        </Text>
      )}
    </Flex>
  );
};
