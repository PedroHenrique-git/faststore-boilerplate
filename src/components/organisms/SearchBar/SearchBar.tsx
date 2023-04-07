import { Box, Spinner, chakra, useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { useDebouncedValue } from 'src/sdk/helpers/useDebouncedValue';
import { useSearch } from 'src/sdk/search/useSearch';
import { SearchHistory } from './SearchHistory';
import { SearchInput } from './SearchInput';
import { SearchResult } from './SearchResult';
import { SearchTop } from './SearchTop';

export const SearchBar = () => {
  const [show, setShow] = useBoolean();
  const { debouncedValue, setValue } = useDebouncedValue('');
  const { refetch, data, isLoading } = useSearch(debouncedValue);
  const { push } = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await refetch();

    if (debouncedValue) {
      push(`/${debouncedValue}`);
    }
  };

  return (
    <Box maxW={'600px'} w={'100%'} position={'relative'}>
      <chakra.form
        onSubmit={onSubmit}
        display={'flex'}
        alignItems={'center'}
        w={'100%'}
      >
        <SearchInput
          onChange={(e) => setValue(e.target.value)}
          onFocus={setShow.on}
        />
      </chakra.form>
      {show && (
        <SearchResult
          on={setShow.on}
          off={setShow.off}
          w={'100%'}
          {...(isLoading
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : {})}
        >
          {isLoading ? (
            <Spinner size="lg" />
          ) : !debouncedValue ? (
            <>
              <SearchHistory />
              <SearchTop terms={data?.search?.suggestions?.terms ?? []} />
            </>
          ) : (
            <></>
          )}
        </SearchResult>
      )}
    </Box>
  );
};
