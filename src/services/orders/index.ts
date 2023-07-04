import axios from 'axios';
import { OrderDetail, OrdersList } from './types';

class OrdersService {
  private http = axios.create({
    baseURL: '/api/vtex/oms/user/orders',
  });

  getOrdersList() {
    return this.http.get<OrdersList>('?per_page=5');
  }

  getOrderDetails(id: string) {
    return this.http<OrderDetail>(`/${id}`);
  }
}

export default new OrdersService();
