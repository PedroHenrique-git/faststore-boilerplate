import { Box, Text } from '@chakra-ui/react';
import { Counter } from '@components/Counter/Counter';

export const Home = ({ title }: { title: string }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      marginTop={'28'}
    >
      <Text as="h1" textAlign="center">
        {title}
      </Text>
      <Counter />
    </Box>
  );
};
