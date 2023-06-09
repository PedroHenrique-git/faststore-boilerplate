import axios from 'axios';
import { API_ENDPOINT } from 'src/sdk/constants';

class VtexSession {
  async create(
    { country, postalCode }: { country: string; postalCode: string },
    cookie: string,
  ) {
    const { data } = await axios.post<SessionResponse>(
      `${API_ENDPOINT}/api/sessions`,
      {
        public: {
          country: { value: country },
          postalCode: { value: postalCode },
        },
      },
      {
        headers: {
          cookie,
        },
      },
    );

    return data;
  }

  async get(cookie: string) {
    const { data } = await axios.get<{
      id: string;
      namespaces: Record<string, Record<string, { value: string }>>;
    }>(`${API_ENDPOINT}/api/sessions?items=*`, {
      headers: {
        cookie,
      },
    });

    return data;
  }
}

export default new VtexSession();
