declare module '../api/api' {
  export function fetchOrders(args?: { signal?: AbortSignal }): Promise<any[]>;
  export function fetchOrderById(id: string | number, args?: { signal?: AbortSignal }): Promise<any>;
  export function fetchAllOrdersMerged(args?: { signal?: AbortSignal }): Promise<any[]>;
  export function authenticateUser(email: string, password: string): Promise<any>;
  export function createOrderLocal(order: any): any;
}

declare module '*.jsx' {
  const component: any;
  export default component;
}

