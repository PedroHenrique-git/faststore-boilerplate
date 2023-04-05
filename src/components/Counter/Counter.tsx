import { Box, Button, Text } from '@chakra-ui/react';
import { useCounter } from 'react-use';

export const Counter = () => {
  const [value, { inc, dec }] = useCounter(0);

  return (
    <Box
      display={'flex'}
      alignItems="center"
      justifyContent={'center'}
      gap={'15px'}
      marginTop={'3'}
      data-testid="counter"
    >
      <Button onClick={() => inc(1)}>add</Button>
      <Text as={'p'}>{value}</Text>
      <Button onClick={() => dec(1)}>remove</Button>
    </Box>
  );
};
