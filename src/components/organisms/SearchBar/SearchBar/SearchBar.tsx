import {
  Box,
  BoxProps,
  Spinner,
  chakra,
  useBoolean,
  useOutsideClick,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import { useDebouncedValue } from 'src/sdk/helpers/useDebouncedValue';
import { useSuggestion } from 'src/sdk/search/useSuggestions';
import { SearchHistory } from '../SearchHistory/SearchHistory';
import { SearchInput } from '../SearchInput/SearchInput';
import { SearchResult } from '../SearchResult';
import { SearchSuggestions } from '../SearchSuggestions/SearchSuggestions';
import { SearchTop } from '../SearchTop/SearchTop';

export const SearchBar = (props: BoxProps) => {
  const [show, setShow] = useBoolean();
  const { debouncedValue, setValue } = useDebouncedValue('');
  const ref = useRef<HTMLDivElement | null>(null);
  const { push } = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await refetch();

    if (debouncedValue) {
      push(`/s?term=${debouncedValue}`);
    }
  };

  useOutsideClick({
    ref: ref,
    handler: setShow.off,
  });

  const { refetch, data, isLoading } = useSuggestion({
    term: debouncedValue,
  });

  return (
    <Box
      maxW={'600px'}
      w={'100%'}
      position={'relative'}
      ref={ref}
      zIndex={99}
      {...props}
    >
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
