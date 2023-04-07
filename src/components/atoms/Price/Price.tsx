import { Text, TextProps } from '@chakra-ui/react';

interface Props extends TextProps {
  price: string;
}

export const Price = ({ price = '', ...props }: Props) => {
  return <Text {...props}>{price}</Text>;
};
