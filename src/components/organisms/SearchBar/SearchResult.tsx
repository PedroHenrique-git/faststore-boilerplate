import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends BoxProps {
  children: React.ReactNode;
}

export const SearchResult = ({ children, ...props }: Props) => {
  return (
    <Box
      marginTop={'3.5'}
      position={'absolute'}
      background={'white'}
      width={'100%'}
      padding={'5'}
      border={'1px solid'}
      borderColor={'gray.200'}
      borderRadius={'2xl'}
      {...props}
    >
      {children}
    </Box>
  );
};
