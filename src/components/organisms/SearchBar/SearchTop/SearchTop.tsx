import { Badge, Heading, Link, List, ListItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useSearchLink } from 'src/sdk/search';
import { MAX_TOP_SEARCH_TERMS } from 'src/sdk/search/useSuggestions';

interface Props {
  terms: Array<{ value: string }>;
}

export const SearchTop = ({ terms = [] }: Props) => {
  const { getLinkProps } = useSearchLink();

  return (
    <>
      <Heading
        fontSize={'medium'}
        color={'blackAlpha.700'}
        lineHeight={'initial'}
      >
        Top Search
      </Heading>
      <List paddingTop={'16px'}>
        {terms.slice(0, MAX_TOP_SEARCH_TERMS).map((term, index) => (
          <ListItem
            key={term.value}
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
            <Link
              as={NextLink}
              fontSize={'medium'}
              {...getLinkProps({ term: term.value })}
            >
              {term.value}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};
