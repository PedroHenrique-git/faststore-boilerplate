import { BuyButton } from '@atoms/BuyButton';
import DiscountBadge from '@atoms/DiscountBadge/DiscountBadge';
import Price from '@atoms/Price/Price';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { ShippingSimulator } from '@molecules/ShippingSimulator';
import { useFormatPrice } from 'src/sdk/product';

interface Props {
  product: ProductDetailsFragment_ProductFragment;
}

export const ProductDetails = ({ product }: Props) => {
  const { formatter } = useFormatPrice();

  const {
    id,
    name,
    description,
    brand: { brandName },
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice, quantity, seller }],
    },
    isVariantOf: { productGroupID },
  } = product;

  return (
    <Card as={'section'} borderRadius={0}>
      <CardHeader>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={'6'}
        >
          <Flex flexDirection={'column'}>
            <Heading
              fontSize={'1.5em'}
              textTransform={'capitalize'}
              fontWeight={'medium'}
            >
              {name}
            </Heading>
            <Text
              fontSize={'.8em'}
              marginTop={'1'}
              textAlign={'left'}
              textTransform={'none'}
            >
              Ref.: {productGroupID}
            </Text>
          </Flex>
          <DiscountBadge
            spotPrice={spotPrice}
            listPrice={listPrice}
            fontSize={'.9em'}
          />
        </Flex>
        <Price formatter={formatter} price={listPrice} spotPrice={spotPrice} />
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Brand
            </Heading>
            <Text pt="2" fontSize="sm">
              {brandName}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Stack divider={<StackDivider />} spacing="4" w={'100%'}>
          <BuyButton product={product} />
          <ShippingSimulator
            items={[{ id, quantity, seller: seller.identifier }]}
          />
        </Stack>
      </CardFooter>
    </Card>
  );
};
