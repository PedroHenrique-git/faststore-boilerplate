import { config } from '@config/store';
import axios from 'axios';
import { Address } from './types';

class CheckoutService {
  private http = axios.create({
    baseURL: '/api/vtex/checkout',
  });

  getAddressByPostalCode(postalCode: string) {
    return this.http.get<Address>(
      `/pub/postal-code/${config.base.session.country}/${postalCode}`,
    );
  }
}

export default new CheckoutService();
