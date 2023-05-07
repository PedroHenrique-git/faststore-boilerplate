import { Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
  actionLabel: string;
  actionPath: string;
  caption: string;
  colorVariant: string;
  title: string;
  variant: string;
}

export const BannerText = ({
  title,
  actionLabel,
  actionPath,
  caption,
}: Props) => {
  return (
    <Flex
      as={'section'}
      direction={'column'}
      background={'gray.100'}
      padding={'1.5rem'}
      margin={'3rem 0'}
      data-testid="banner-text"
    >
      <Flex direction={'column'} gap={'1'} marginBottom={'20'}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          {title}
        </Text>
        <Text fontSize={'1xl'}>{caption}</Text>
      </Flex>
      <Link
        as={NextLink}
        href={actionPath}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={'10px'}
        background={'blackAlpha.500'}
        color={'white'}
        w={'min(100%, 160px)'}
        _hover={{ textDecoration: 'none', opacity: '.5' }}
        transition={'opacity 300ms ease-in-out'}
      >
        {actionLabel}
      </Link>
    </Flex>
  );
};
