
export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface OrderPayload {
  userId: string;
  items: OrderItem[];
  total: number;
  // Adicione outros campos conforme necessário
}
