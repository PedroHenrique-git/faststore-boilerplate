import { BuyButton } from '@atoms/BuyButton';
import DiscountBadge from '@atoms/DiscountBadge';
import Price from '@atoms/Price';
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
import { ProductSummary_ProductFragment } from '@generated/graphql';
import NextLink from 'next/link';
import { memo } from 'react';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';
import { useProductLink } from 'src/sdk/product/useProductLink';

interface Props {
  product: ProductSummary_ProductFragment;
  index: number;
}

const ProductCard = ({ product, index }: Props) => {
  const {
    name,
    image: [firstImage],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice }],
    },
  } = product;

  const { formatter } = useFormatPrice();
  const props = useProductLink({ product, selectedOffer: 0, index });

  return (
    <Card
      boxShadow={0}
      border={'1px solid'}
      borderColor={'gray.200'}
      data-testid="product-card"
    >
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
          <Link as={NextLink} _hover={{ textDecoration: 'none' }} {...props}>
            <Heading as="h3" fontSize={'larger'} fontWeight={'thin'}>
              {name}
            </Heading>
          </Link>
          <Price
            formatter={formatter}
            price={listPrice}
            spotPrice={spotPrice}
          />
          <DiscountBadge listPrice={listPrice} spotPrice={spotPrice} />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <BuyButton product={product} />
      </CardFooter>
    </Card>
  );
};

export default memo(ProductCard);
