import { createContext, useContext, useMemo, useReducer } from 'react';
import { LoginMethods } from '../LoginMethods';

type LoginTypes = 'accesskey' | 'email-password' | null;

type Actions =
  | { type: 'changeLoginOption'; payload: LoginTypes }
  | { type: 'setAuthenticationToken'; payload: string }
  | { type: 'setUserEmail'; payload: string }
  | { type: 'reset' };

interface State {
  selectedLogin: LoginTypes;
  authenticationToken: string;
  userEmail: string;
}

interface Values extends State {
  changeLoginOption(_loginOption: LoginTypes): void;
  setAuthenticationToken(_token: string): void;
  setUserEmail(_email: string): void;
  reset(): void;
}

const DEFAULT_VALUES: Values = {
  authenticationToken: '',
  userEmail: '',
  selectedLogin: null,
  changeLoginOption: () => null,
  setAuthenticationToken: () => null,
  setUserEmail: () => null,
  reset: () => null,
};

const InitialState: State = {
  authenticationToken: '',
  userEmail: '',
  selectedLogin: null,
};

const LoginContext = createContext<Values>(DEFAULT_VALUES);

const reducer = (state: State, action: Actions): State => {
  const { type } = action;

  switch (type) {
    case 'changeLoginOption':
      return {
        ...state,
        selectedLogin: action.payload,
      };
    case 'setAuthenticationToken':
      return {
        ...state,
        authenticationToken: action.payload,
      };
    case 'setUserEmail':
      return {
        ...state,
        userEmail: action.payload,
      };
    case 'reset': {
      return {
        ...state,
        authenticationToken: '',
        selectedLogin: null,
        userEmail: '',
      };
    }
    default:
      return state;
  }
};

export const Login = () => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const values = useMemo<Values>(
    () => ({
      changeLoginOption: (loginOption) => {
        dispatch({ type: 'changeLoginOption', payload: loginOption });
      },
      setAuthenticationToken: (token) => {
        dispatch({ type: 'setAuthenticationToken', payload: token });
      },
      setUserEmail: (email) => {
        dispatch({ type: 'setUserEmail', payload: email });
      },
      reset: () => {
        dispatch({ type: 'reset' });
      },
      ...state,
    }),
    [state, dispatch],
  );

  return (
    <LoginContext.Provider value={values}>
      <LoginMethods />
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);

  if (context === undefined) {
    throw new Error('useLoginContext must be used within LoginProvider');
  }

  return context;
};
