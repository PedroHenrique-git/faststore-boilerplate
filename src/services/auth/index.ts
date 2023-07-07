import axios from 'axios';

interface SendAccessKeyDTO {
  email: string;
  authenticationToken: string;
}

interface ValidateAccessKeyDTO {
  accessKey: string;
  email: string;
  authenticationToken: string;
}

class Auth {
  async start() {
    const {
      data: { authenticationToken },
    } = await axios.get<LoginStart>('/api/auth/start', {
      withCredentials: true,
    });

    return { authenticationToken };
  }

  async logout() {
    const { data } = await axios.get<{ message: string }>('/api/auth/logout', {
      withCredentials: true,
    });

    return data;
  }

  async sendAccessKey({ email, authenticationToken }: SendAccessKeyDTO) {
    return axios.post('/api/auth/accesskey/send', {
      email,
      authenticationToken,
    });
  }

  async validateAccessKey({
    accessKey,
    email,
    authenticationToken,
  }: ValidateAccessKeyDTO) {
    return axios.post(
      '/api/auth/accesskey/validate',
      {
        code: accessKey,
        email: email,
        authenticationToken,
      },
      { withCredentials: true },
    );
  }
}

export default new Auth();
