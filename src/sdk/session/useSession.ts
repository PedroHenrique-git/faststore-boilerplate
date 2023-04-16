import { config } from '@config/store';
import { IStoreSession } from '@generated/graphql';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { sessionAtom } from '../state';
import { createStore } from '../store';
import { useValidationSession } from './useValidationSession';

const sessionStore = createStore('fs::session', config.base.session);

export function useSession() {
  const [session, setSession] = useAtom(sessionAtom);

  const { isError, isLoading, validate } = useValidationSession();

  const set = useCallback(
    async (receivedSession: Partial<IStoreSession>) => {
      const { set } = (await sessionStore) ?? {};

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
