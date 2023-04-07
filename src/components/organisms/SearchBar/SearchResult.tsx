import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
  children: React.ReactNode;
  on(): void;
  off(): void;
}

export const SearchResult = ({ children, on, off, ...props }: Props) => {
  return (
    <Box
      marginTop={'3.5'}
      position={'absolute'}
      background={'white'}
      width={'100%'}
      padding={'5'}
      border={'1px solid'}
      borderColor={'gray.100'}
      borderRadius={'2xl'}
      onMouseEnter={on}
      onMouseLeave={off}
      {...props}
    >
      {children}
    </Box>
  );
};
