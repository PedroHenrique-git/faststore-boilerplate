import { useCallback, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { IndexedDBService } from 'src/services/IndexedDBService';

const indexedDBService = new IndexedDBService();

interface Term {
  value: string;
}

const KEY = 'fs:terms:history';

export function useSearchHistory() {
  const [terms, setTerms] = useState<Term[] | null>(null);

  const add = useCallback(async (term: Term) => {
    const terms = await indexedDBService.get<Term[]>(KEY);

    if (terms?.find((t) => t.value === term.value)) {
      return;
    }

    terms?.push(term);

    const newTerms = await indexedDBService.set<Term[]>(KEY, terms ?? []);

    setTerms(newTerms);
  }, []);

  const get = useCallback(async () => {
    const storageTerms = await indexedDBService.get<Term[]>(KEY);

    setTerms(storageTerms);

    return storageTerms;
  }, []);

  const clear = useCallback(() => {
    indexedDBService.set<Term[]>(KEY, []);

    setTerms([]);
  }, []);

  useEffectOnce(() => {
    get();
  });

  return { add, get, clear, terms };
}
