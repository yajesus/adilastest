import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchAllOrdersMerged } from '../api/api'
import OrderTable from '../components/OrderTable.jsx'

export default function Orders() {
  type Order = { id: string | number; customerName: string; status: string; totalPrice: number; createdAt: string }
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const params = new URLSearchParams(location.search)
  const status = params.get('status') || ''

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    fetchAllOrdersMerged({ signal: controller.signal })
      .then(setOrders)
      .catch((e) => setError(e.message || 'Error loading orders'))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const filtered = useMemo(() => {
    if (!status) return orders
    return orders.filter((o) => o.status === status)
  }, [orders, status])

  const onChangeStatus = (value: string) => {
    const next = new URLSearchParams(location.search)
    if (value) next.set('status', value)
    else next.delete('status')
    navigate({ pathname: '/orders', search: `?${next.toString()}` })
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select
          className="border rounded p-2 bg-white"
          value={status}
          onChange={(e) => onChangeStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {loading && <div className="text-center py-6"><span className="inline-block animate-pulse px-3 py-2 rounded bg-gray-100">Loading orders…</span></div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && <OrderTable orders={filtered} />}
    </div>
  )
}