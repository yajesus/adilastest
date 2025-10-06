export type Order = {
  id: string | number;
  customerName: string;
  status: 'pending' | 'completed' | string;
  totalPrice: number;
  createdAt: string;
  _raw?: any;
};

export declare function fetchOrders(args?: { signal?: AbortSignal }): Promise<Order[]>;
export declare function fetchOrderById(id: string | number, args?: { signal?: AbortSignal }): Promise<Order>;
export declare function fetchAllOrdersMerged(args?: { signal?: AbortSignal }): Promise<Order[]>;
export declare function authenticateUser(email: string, password: string): Promise<{ id: number; email: string }>;
export declare function createOrderLocal(order: Partial<Order>): Order;

