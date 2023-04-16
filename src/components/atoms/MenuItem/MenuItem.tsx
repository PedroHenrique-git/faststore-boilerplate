import { Link, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
  text: string;
  href: string;
}

export const MenuItem = ({ href = '', text = '' }: Props) => {
  return (
    <ListItem>
      <Link as={NextLink} href={href}>
        {text}
      </Link>
    </ListItem>
  );
};
