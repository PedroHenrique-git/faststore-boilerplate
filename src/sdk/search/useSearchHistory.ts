import { useCallback, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { createStore } from '../store';

interface Term {
  value: string;
}

const historyStore = createStore('fs:terms:history', []);

export function useSearchHistory() {
  const [terms, setTerms] = useState<Term[] | null>(null);

  const add = useCallback(async (term: Term) => {
    const { set, get } = await historyStore;

    const terms = await get<Term[] | null>();

    if (terms?.find((t) => t.value === term.value)) {
      return;
    }

    terms?.push(term);

    const newTerms = await set<Term[]>(terms ?? []);

    setTerms(newTerms);
  }, []);

  const get = useCallback(async () => {
    const { get } = await historyStore;

    const storageTerms = await get<Term[]>();

    setTerms(storageTerms ?? []);

    return storageTerms;
  }, []);

  const clear = useCallback(async () => {
    const { set } = await historyStore;

    set<Term[]>([]);

    setTerms([]);
  }, []);

  useEffectOnce(() => {
    get();
  });

  return { add, get, clear, terms };
}
