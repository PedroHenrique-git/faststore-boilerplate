import axios from 'axios';

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

  async sendAccessKey({
    email,
    authenticationToken,
  }: {
    email: string;
    authenticationToken: string;
  }) {
    return axios.post('/api/auth/accesskey/send', {
      email,
      authenticationToken,
    });
  }

  async validateAccessKey({
    accessKey,
    email,
    authenticationToken,
  }: {
    accessKey: string;
    email: string;
    authenticationToken: string;
  }) {
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
