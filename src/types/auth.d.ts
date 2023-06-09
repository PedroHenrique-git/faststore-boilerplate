interface LoginStart {
  authCookie: string | null;
  authenticationToken: string | null;
  isAuthenticated: boolean;
  oauthProviders: unknown[];
  samlProviders: unknown[];
  selectedProvider: string | null;
  showAccessKeyAuthentication: boolean;
  showClassicAuthentication: boolean;
}

interface AuthResponse {
  authStatus: string;
  promptMFA: boolean;
  clientToken: string | null;
  authCookie: {
    Name: string;
    Value: string;
  };
  accountAuthCookie: {
    Name: string;
    Value: string;
  };
  expiresIn: number;
  userId: string;
  phoneNumber: string | null;
  scope: string | null;
}

interface SessionResponse {
  segmentToken: string;
  sessionToken: string;
}
