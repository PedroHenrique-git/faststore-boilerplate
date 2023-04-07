import {
  Box,
  Spinner,
  chakra,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import { useDebouncedValue } from 'src/sdk/helpers/useDebouncedValue';
import { useSearch } from 'src/sdk/search/useSearch';
import { SearchHistory } from './SearchHistory';
import { SearchInput } from './SearchInput';
import { SearchResult } from './SearchResult';
import { SearchSuggestions } from './SearchSuggestions';
import { SearchTop } from './SearchTop';

export const SearchBar = () => {
  const [show, setShow] = useBoolean();
  const { debouncedValue, setValue, setDebouncedValue } = useDebouncedValue('');
  const ref = useRef<HTMLDivElement | null>(null);
  const { push } = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await refetch();

    if (debouncedValue) {
      push(`/${debouncedValue}`);
    }
  };

  const handleClear = () => {
    setValue('');
    setDebouncedValue('');
    setShow.off();
  };

  useOutsideClick({
    ref: ref,
    handler: handleClear,
  });

  const { refetch, data, isLoading } = useSearch({
    term: debouncedValue,
  });

  return (
    <Box maxW={'600px'} w={'100%'} position={'relative'} ref={ref}>
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
            <Spinner size="lg" color="blackAlpha.700" />
          ) : !debouncedValue ? (
            <>
              <SearchHistory />
              <SearchTop terms={data?.search?.suggestions?.terms ?? []} />
            </>
          ) : (
            <SearchSuggestions
              products={data?.search?.suggestions?.products ?? []}
            />
          )}
        </SearchResult>
      )}
    </Box>
  );
};
