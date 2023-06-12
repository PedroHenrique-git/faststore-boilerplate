import axios from 'axios';
import { User } from './types';

class SafeData {
  async getUserData() {
    const { data } = await axios.get<User[]>(
      '/vtex/api/io/safedata/CL/search?_fields=email,document,firstName,lastName,phone,birthDate,userId',
    );

    return data;
  }

  async updateUserData(userId: string, newData: Partial<User>) {
    const { data } = await axios.patch<User>(
      `/vtex/api/io/safedata/CL/documents/${userId}`,
      newData,
    );

    return data;
  }
}

export default new SafeData();
