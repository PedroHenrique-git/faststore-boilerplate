import { config } from '@config/store';
import axios from 'axios';
import FormData from 'form-data';
import { API_ENDPOINT } from 'src/sdk/constants';

class VtexId {
  async start() {
    const { data, headers } = await axios.get<LoginStart>(
      `${API_ENDPOINT}/api/vtexid/pub/authentication/start?scope=${config.base.api.storeId}&locale=${config.base.session.locale}`,
    );

    return {
      data,
      headers,
    };
  }

  async sendAccessKey({
    email,
    authenticationToken,
  }: {
    email: string;
    authenticationToken: string;
  }) {
    const form = new FormData();

    form.append('email', email);
    form.append('authenticationToken', authenticationToken);

    const { data } = await axios.post(
      `${API_ENDPOINT}/api/vtexid/pub/authentication/accesskey/send`,
      form,
      {
        headers: form.getHeaders(),
      },
    );

    return data;
  }

  async validateAccessKey(
    {
      accessKey,
      authenticationToken,
      email,
    }: {
      accessKey: string;
      email: string;
      authenticationToken: string;
    },
    cookie: string,
  ) {
    const encoded = new URLSearchParams();

    encoded.set('accessKey', accessKey);
    encoded.set('email', email);
    encoded.set('authenticationToken', authenticationToken);

    const { data } = await axios.post<AuthResponse>(
      `${API_ENDPOINT}/api/vtexid/pub/authentication/accesskey/validate`,
      encoded,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          cookie,
        },
      },
    );

    return data;
  }

  async logout(cookie: string) {
    const { data, headers } = await axios.get(
      `${API_ENDPOINT}/api/vtexid/pub/authentication/logout?scope=${config.base.api.storeId}`,
      {
        headers: {
          Accept: 'text / plain',
          cookie,
        },
        withCredentials: true,
      },
    );

    return {
      data,
      headers,
    };
  }
}

export default new VtexId();
