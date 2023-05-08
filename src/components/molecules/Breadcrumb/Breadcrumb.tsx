import {
  Breadcrumb as BreadcrumbChakra,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { StoreListItem } from '@generated/graphql';
import NextLink from 'next/link';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

interface Props {
  items: StoreListItem[];
}

export const Breadcrumb = ({ items }: Props) => {
  return (
    <BreadcrumbChakra
      separator={<MdOutlineArrowForwardIos size={10} />}
      paddingTop={'2rem'}
      paddingBottom={'2rem'}
      overflowX={'auto'}
      css={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      data-testid="breadcrumb"
    >
      {items.map((item) => (
        <BreadcrumbItem key={item.position} flexShrink={0}>
          <BreadcrumbLink as={NextLink} href={item.item}>
            {item.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </BreadcrumbChakra>
  );
};
