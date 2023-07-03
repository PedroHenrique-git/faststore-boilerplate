import axios from 'axios';
import { Address, User } from './types';

class SafeData {
  private http = axios.create();

  async getUserData() {
    const { data } = await this.http.get<User>('/api/safedata/CL');

    return data;
  }

  async getUserAddresses() {
    const { data } = await this.http.get<Address[]>(`/api/safedata/AD`);

    return data;
  }

  async createAddress(address: Omit<Address, 'id'>) {
    const { data } = await this.http.post<Address>('/api/safedata/AD', address);

    return data;
  }

  async updateAddress(id: string, address: Omit<Address, 'id'>) {
    const { data } = await this.http.patch<Address>(
      `/api/safedata/AD/${id}`,
      address,
    );

    return data;
  }

  async deleteAddress(id: string) {
    return this.http.delete(`/api/safedata/AD/${id}`);
  }

  async updateUserData(newData: Partial<User>) {
    const { data } = await this.http.patch<Partial<User>>(
      '/api/safedata/CL',
      newData,
    );

    return data;
  }
}

export default new SafeData();
