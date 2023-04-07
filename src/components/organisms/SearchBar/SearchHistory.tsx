import {
  Badge,
  Box,
  Button,
  Heading,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSearchHistory } from 'src/sdk/search/useSearchHistory';

export const SearchHistory = () => {
  const { terms, clear } = useSearchHistory();

  if (!terms?.length) {
    return null;
  }

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading
          fontSize={'medium'}
          color={'blackAlpha.700'}
          lineHeight={'initial'}
        >
          Search History
        </Heading>
        <Button
          onClick={clear}
          padding={0}
          background={'transparent'}
          _hover={{ background: 'transparent' }}
          _active={{ background: 'transparent' }}
          textAlign={'end'}
          display={'flex'}
          alignItems={'flex-start'}
          color={'blackAlpha.700'}
        >
          clear history
        </Button>
      </Box>
      <List padding={'16px 0'}>
        {terms?.map(({ value }, index) => (
          <ListItem
            key={value}
            display={'flex'}
            gap={'3'}
            marginBottom={'10px'}
            _last={{ marginBottom: '0' }}
          >
            <Badge
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              marginRight={'2'}
              fontSize={'small'}
              borderRadius={'full'}
              width={'25px'}
              height={'25px'}
            >
              {index + 1}
            </Badge>
            <Link as={NextLink} href={`/value`} fontSize={'medium'}>
              {value}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
