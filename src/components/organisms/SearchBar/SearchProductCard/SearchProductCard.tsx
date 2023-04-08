import { Price } from '@atoms/Price';
import { Card, CardBody, Img, Link, ListItem } from '@chakra-ui/react';
import { ProductFragment } from '@generated/graphql';
import NextLink from 'next/link';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';

interface Props {
  product: ProductFragment;
}

export const SearchProductCart = ({ product }: Props) => {
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
    <ListItem>
      <Link
        as={NextLink}
        href={`/${slug}/p`}
        _hover={{ textDecoration: 'none' }}
      >
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
