import { Link } from 'react-router-dom'

/**
 * @typedef {Object} Order
 * @property {string|number} id
 * @property {string} customerName
 * @property {string} status
 * @property {number} totalPrice
 */

/**
 * @param {{ orders: Order[] }} props
 */
export default function OrderTable({ orders }) {
  return (
    <div>
      {/* Mobile cards */}
      <ul className="grid gap-3 sm:hidden">
        {orders.map((o) => (
          <li key={o.id} className="rounded border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Link className="text-blue-600 underline" to={`/orders/${o.id}`}>Order #{o.id}</Link>
              <span className={`px-2 py-1 rounded text-xs ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.status}</span>
            </div>
            <div className="mt-2 text-sm text-gray-700">{o.customerName}</div>
            <div className="mt-1 font-semibold">${o.totalPrice}</div>
          </li>
        ))}
      </ul>
      {/* Desktop table */}
      <table className="hidden sm:table w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr>
            <th className="p-3 text-left bg-gray-50">Order ID</th>
            <th className="p-3 text-left bg-gray-50">Customer</th>
            <th className="p-3 text-left bg-gray-50">Status</th>
            <th className="p-3 text-left bg-gray-50">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t hover:bg-gray-50">
              <td className="p-3"><Link className="text-blue-600 underline" to={`/orders/${o.id}`}>{o.id}</Link></td>
              <td className="p-3">{o.customerName}</td>
              <td className="p-3 capitalize">
                <span className={`px-2 py-1 rounded text-xs ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {o.status}
                </span>
              </td>
              <td className="p-3">${o.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
