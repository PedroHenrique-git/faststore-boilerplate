import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';

interface Props {
  imageAlt: string;
  imageSrc: string;
  link: string;
  linkText: string;
  subtitle: string;
  title: string;
}

export const CardItem = ({
  imageAlt,
  imageSrc,
  link,
  linkText,
  subtitle,
  title,
}: Props) => {
  return (
    <Card
      direction={{ base: 'column', sm: 'column', lg: 'row' }}
      overflow="hidden"
      variant="outline"
      borderRadius={0}
      border={0}
      marginTop={'5'}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '100%', lg: '30%' }}
        src={imageSrc}
        alt={imageAlt}
      />

      <Stack background={'gray.100'} w={'100%'}>
        <CardBody>
          <Heading
            as={'h3'}
            fontSize={'2xl'}
            color={'blackAlpha.700'}
            marginBottom={'3'}
          >
            {title}
          </Heading>

          <Heading as={'h4'} fontSize={'medium'} color={'blackAlpha.700'}>
            {subtitle}
          </Heading>
        </CardBody>

        <CardFooter>
          <Link
            as={NextLink}
            href={link}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'7px'}
            background={'blackAlpha.500'}
            color={'white'}
            w={'min(100%, 150px)'}
            _hover={{ textDecoration: 'none', opacity: '.5' }}
            transition={'opacity 300ms ease-in-out'}
          >
            {linkText}
            <HiArrowNarrowRight size={20} color="#fff" />
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
};
