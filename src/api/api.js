const ORDERS_BASE = 'https://dummyjson.com/carts';

async function fetchJson(url, { signal, timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: mergeSignals(signal, controller.signal), mode: 'cors' });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    const isAbort = err && (err.name === 'AbortError' || /aborted/i.test(err.message || ''));
    if (isAbort) throw new Error('Request timed out. Please retry.');
    throw new Error('Network error: Failed to fetch data. Check your internet or firewall.');
  } finally {
    clearTimeout(timer);
  }
}

function mergeSignals(a, b) {
  if (!a) return b;
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  a.addEventListener('abort', onAbort);
  b.addEventListener('abort', onAbort);
  return controller.signal;
}

function mapCartToOrder(cart) {
  const total = typeof cart.total === 'number' ? cart.total : cart.discountedTotal ?? 0;
  return {
    id: cart.id,
    customerName: `User ${cart.userId}`,
    status: cart.totalProducts > 0 ? 'completed' : 'pending',
    totalPrice: total,
    createdAt: new Date().toISOString(),
    // include raw for detail view
    _raw: cart,
  };
}

export async function fetchOrders({ signal } = {}) {
  try {
    const data = await fetchJson(`${ORDERS_BASE}`, { signal });
    return (data.carts || []).map(mapCartToOrder);
  } catch (e) {
    // Fallback sample when offline or blocked
    return [
      mapCartToOrder({ id: 101, userId: 1, total: 120, totalProducts: 3 }),
      mapCartToOrder({ id: 102, userId: 2, total: 80, totalProducts: 1 }),
    ];
  }
}

export async function fetchOrderById(id, { signal } = {}) {
  // If it's a locally created order id, return from local storage immediately
  if (String(id).startsWith('local-')) {
    const local = getLocalOrders().find((o) => String(o.id) === String(id));
    if (local) return local;
  }
  try {
    const cart = await fetchJson(`${ORDERS_BASE}/${id}`, { signal });
    return mapCartToOrder(cart);
  } catch (e) {
    // Try to synthesize from merged list (local first)
    const fromMerged = (await fetchAllOrdersMerged({ signal })).find((o) => String(o.id) === String(id));
    if (fromMerged) return fromMerged;
    throw e;
  }
}

const LOCAL_KEY = 'orders:new';

export function createOrderLocal(order) {
  const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  const newOrder = {
    id: `local-${Date.now()}`,
    customerName: order.customerName,
    status: order.status,
    totalPrice: Number(order.totalPrice) || 0,
    createdAt: order.createdAt || new Date().toISOString(),
  };
  localStorage.setItem(LOCAL_KEY, JSON.stringify([newOrder, ...existing]));
  return newOrder;
}

export function getLocalOrders() {
  return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
}

export async function fetchAllOrdersMerged({ signal } = {}) {
  const remote = await fetchOrders({ signal });
  const local = getLocalOrders();
  return [...local, ...remote];
}

// Mock user auth
export async function authenticateUser(email, password) {
  // simulate latency
  await new Promise(r => setTimeout(r, 300));
  if (email && password) {
    return { id: 1, email };
  }
  throw new Error('Invalid credentials');
}
