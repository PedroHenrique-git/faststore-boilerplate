import { Price } from '@atoms/Price';
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react';
import { ProductFragment } from '@generated/graphql';
import NextLink from 'next/link';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';

interface Props {
  product: ProductFragment;
}

export const ProductCard = ({ product }: Props) => {
  const {
    name,
    slug,
    image: [firstImage],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice }],
    },
  } = product;

  const { formatter } = useFormatPrice();

  return (
    <Card boxShadow={0} border={'1px solid'} borderColor={'gray.200'}>
      <CardBody>
        <Image
          src={firstImage.url}
          alt={name}
          objectFit={'cover'}
          borderRadius="lg"
          w={'100%'}
          h={'180px'}
        />

        <Stack mt="6" spacing="3">
          <Link
            as={NextLink}
            href={`/${slug}/p`}
            _hover={{ textDecoration: 'none' }}
          >
            <Heading as="h3" fontSize={'larger'} fontWeight={'thin'}>
              {name}
            </Heading>
          </Link>
          <Price
            formatter={formatter}
            price={listPrice}
            spotPrice={spotPrice}
          />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
};
