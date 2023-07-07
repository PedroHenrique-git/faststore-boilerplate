import axios from 'axios';
import { OrderDetail, OrdersList } from './types';

class OrdersService {
  private http = axios.create({
    baseURL: '/api/vtex/oms/user/orders',
  });

  getOrdersList() {
    return this.http.get<OrdersList>(`?per_page=5`);
  }

  getOrderDetails(id: string) {
    return this.http<OrderDetail>(`/${id}`);
  }

  cancelOrder(id: string, reason: string) {
    this.http.defaults.baseURL = '/api/vtex/oms/pvt/orders';

    return this.http.post(`/${id}/cancel`, { reason });
  }
}

export default new OrdersService();
