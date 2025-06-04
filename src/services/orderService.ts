import { api } from './api';
import { OrderPayload } from '../types/order';

export async function finalizeOrder(orderData: OrderPayload) {
  return await api.post<any>('/orders/finalize', orderData);
}
