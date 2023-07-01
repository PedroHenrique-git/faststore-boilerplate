import axios from 'axios';
import { Address, User } from './types';

class SafeData {
  private http = axios.create({
    baseURL: '/api/vtex/io/safedata',
  });

  async getUserData() {
    const { data } = await this.http.get<User[]>(
      '/CL/search?_fields=email,document,firstName,lastName,phone,birthDate,userId',
    );

    return data;
  }

  async getUserAddresses(userId: string) {
    const { data } = await this.http.get<Address[]>(
      `/AD/search?userId=${userId}&_fields=id,postalCode,state,city,neighborhood,street,number,complement,country`,
    );

    return data;
  }

  async createAddress(address: Omit<Address, 'id'>) {
    const { data } = await this.http.post<Address>('/AD/documents', address);

    return data;
  }

  async updateUserData(userId: string, newData: Partial<User>) {
    const { data } = await this.http.patch<User>(
      `/CL/documents/${userId}`,
      newData,
    );

    return data;
  }
}

export default new SafeData();
