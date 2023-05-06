import Price from '@atoms/Price';
import { Card, CardBody, Img, Link, ListItem } from '@chakra-ui/react';
import { ProductFragment } from '@generated/graphql';
import NextLink from 'next/link';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';
import { useProductLink } from 'src/sdk/product/useProductLink';

interface Props {
  product: ProductFragment;
  index: number;
}

export const SearchProductCart = ({ product, index }: Props) => {
  const {
    name,
    image: [firstImage],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice }],
    },
  } = product;

  const { formatter } = useFormatPrice();
  const props = useProductLink({ product, index, selectedOffer: 0 });

  return (
    <ListItem>
      <Link as={NextLink} _hover={{ textDecoration: 'none' }} {...props}>
        <Card
          display={'flex'}
          alignItems={'center'}
          direction={{ base: 'row' }}
          boxShadow={'none'}
          borderRadius={0}
          marginBottom={'3.5'}
          padding={'1.5'}
          _hover={{
            background: 'gray.200',
          }}
          _last={{ marginBottom: 0 }}
        >
          <Img
            src={firstImage.url}
            alt={name}
            loading="eager"
            boxSize={'56px'}
            objectFit={'cover'}
          />

          <CardBody display={'flex'} alignItems={'center'} gap={'2'}>
            <Price
              formatter={formatter}
              price={listPrice}
              spotPrice={spotPrice}
            />
          </CardBody>
        </Card>
      </Link>
    </ListItem>
  );
};
