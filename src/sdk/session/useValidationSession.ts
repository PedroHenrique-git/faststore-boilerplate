import {
  IStoreSession,
  ValidateSessionMutation,
  ValidateSessionMutationVariables,
} from '@generated/graphql';
import { useMutation } from 'react-query';
import { ValidateSession } from 'src/graphql/mutations/ValidateSession';
import { graphqlClient } from 'src/server/graphql';

export const validateSession = async (session: IStoreSession) => {
  const data = await graphqlClient.request<
    ValidateSessionMutation,
    ValidateSessionMutationVariables
  >(ValidateSession, {
    search: window.location.search,
    session,
  });

  return data.validateSession;
};

export function useValidationSession() {
  const { mutate, data, isError, isLoading } = useMutation({
    mutationKey: 'session',
    mutationFn: (session: IStoreSession) => validateSession(session),
  });

  return {
    session: data,
    isError,
    isLoading,
    validate: mutate,
  };
}
