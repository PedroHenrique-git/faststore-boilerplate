import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import NextLink from 'next/link';
import { userData } from 'src/sdk/state';

export const OrderDetailProductsList = () => {
  const { selectedOrder } = useAtomValue(userData);

  return (
    <Box as="section" margin={'2rem 0'}>
      <Heading size="sm" marginBottom={'2rem'}>
        Products
      </Heading>

      <List>
        <Stack divider={<StackDivider />} spacing="2">
          {selectedOrder?.items.map((i) => (
            <ListItem key={i.id}>
              <Flex gap={'4'} alignItems={'center'}>
                <Image
                  src={i.imageUrl}
                  alt={i.name}
                  objectFit={'cover'}
                  boxSize={'90px'}
                />

                <Flex flexDirection={'column'}>
                  <Link as={NextLink} href={i.detailUrl}>
                    {i.name}
                  </Link>
                  <small>{i.additionalInfo.brandName}</small>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </Stack>
      </List>
    </Box>
  );
};
