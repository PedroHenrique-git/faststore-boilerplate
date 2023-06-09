import axios from 'axios';

class Session {
  async create({
    country,
    postalCode,
  }: {
    country: string;
    postalCode: string;
  }) {
    const { data } = await axios.post('/api/session/create', {
      country: country,
      postalCode: postalCode,
    });

    return data;
  }

  async get() {
    const { data } = await axios.get<{
      id: string;
      namespaces: Record<string, Record<string, { value: string }>>;
    }>('/api/session/get');

    return data;
  }
}

export default new Session();
