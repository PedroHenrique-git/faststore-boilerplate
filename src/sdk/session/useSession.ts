import { config } from '@config/store';
import { IStoreSession } from '@generated/graphql';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { SESSION_STORE_KEY } from '../constants';
import { sessionAtom } from '../state';
import store from '../store';
import { useValidationSession, validateSession } from './useValidationSession';

const sessionStore = store.createStore(
  SESSION_STORE_KEY,
  config.base.session,
  async (indexeddb) => {
    const session = await indexeddb.get(SESSION_STORE_KEY);
    const validatedSession = await validateSession(session as IStoreSession);

    if (validatedSession) {
      await indexeddb.set(SESSION_STORE_KEY, validatedSession);
    }
  },
);

export function useSession() {
  const [session, setSession] = useAtom(sessionAtom);

  const { isError, isLoading, validate } = useValidationSession();

  const set = useCallback(
    async (receivedSession: Partial<IStoreSession>) => {
      const { set } = await sessionStore;

      const newSession = {
        ...session,
        ...receivedSession,
      };

      // new states before validate
      setSession(newSession);
      set?.(newSession);

      validate(newSession, {
        onSuccess(data) {
          if (data) {
            // new states after validate
            setSession(data);
            set?.(data);
          }
        },
      });
    },
    [session, setSession, validate],
  );

  return useMemo(
    () => ({ set, session, isValidating: isLoading, isError }),
    [set, session, isLoading, isError],
  );
}
