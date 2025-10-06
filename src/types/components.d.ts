declare module '../components/OrderTable.jsx' {
  const Component: (props: { orders: Array<{ id: string | number; customerName: string; status: string; totalPrice: number }> }) => any;
  export default Component;
}

declare module '../components/OrderTable' {
  const Component: (props: { orders: Array<{ id: string | number; customerName: string; status: string; totalPrice: number }> }) => any;
  export default Component;
}

declare module '../components/Loader.jsx' {
  const Component: () => any;
  export default Component;
}

