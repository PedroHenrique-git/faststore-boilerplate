import { useCallback, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { SEARCH_STORE_KEY } from '../constants';
import { createStore } from '../store';

interface Term {
  value: string;
}

const historyStore = createStore(SEARCH_STORE_KEY, []);

export function useSearchHistory() {
  const [terms, setTerms] = useState<Term[] | null>(null);

  const add = useCallback(async (term: Term) => {
    const { set, get } = await historyStore;

    const terms = await get?.<Term[] | null>();

    if (terms?.some((t) => t.value === term.value)) {
      return;
    }

    terms?.push(term);

    const newTerms = await set?.<Term[]>(terms ?? []);

    if (newTerms) {
      setTerms(newTerms);
    }
  }, []);

  const get = useCallback(async () => {
    const { get } = await historyStore;

    const storageTerms = await get?.<Term[]>();

    setTerms(storageTerms ?? []);

    return storageTerms;
  }, []);

  const clear = useCallback(async () => {
    const { set } = await historyStore;

    set?.<Term[]>([]);

    setTerms([]);
  }, []);

  useEffectOnce(() => {
    get();
  });

  return { add, get, clear, terms };
}
