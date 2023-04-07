import { Price } from '@atoms/Price';
import { Card, CardBody, Img, Link } from '@chakra-ui/react';
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

  const { newPrice: formattedSpotPrice } = useFormatPrice(spotPrice);
  const { newPrice: formattedPrice } = useFormatPrice(listPrice);

  return (
    <Link as={NextLink} href={`/${slug}/p`} _hover={{ textDecoration: 'none' }}>
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
        <Img src={firstImage.url} alt={name} loading="eager" boxSize={'56px'} />

        <CardBody display={'flex'} alignItems={'center'} gap={'2'}>
          <Price
            price={formattedPrice}
            fontSize={'small'}
            textDecor={'line-through'}
          />
          <Price
            price={formattedSpotPrice}
            fontSize={'medium'}
            fontWeight={'bold'}
          />
        </CardBody>
      </Card>
    </Link>
  );
};
