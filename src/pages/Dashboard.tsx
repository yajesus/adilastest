import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SummaryCards from '../components/SummaryCards'
import { fetchAllOrdersMerged } from '../api/api'

type Order = { id: string | number; customerName: string; status: string; totalPrice: number; createdAt: string }

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    fetchAllOrdersMerged({ signal: controller.signal })
      .then(setOrders)
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const stats = useMemo(() => {
    const totalOrders = orders.length
    const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)
    const pending = orders.filter((o) => o.status === 'pending').length
    const recent = [...orders].slice(0, 5)
    return { totalOrders, revenue, pending, recent }
  }, [orders])

  return (
    <div className="p-6 space-y-6">
      <section className="rounded-xl border bg-white p-6 shadow-sm relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/0" />
        <div className="relative">
          <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
          <p className="text-gray-600 mt-1">Track orders, revenue, and customers at a glance.</p>
          <div className="mt-4 flex gap-2">
            <Link to="/orders" className="bg-blue-600 text-white px-4 py-2 rounded">View orders</Link>
            <Link to="/create-order" className="border px-4 py-2 rounded">Create order</Link>
          </div>
        </div>
      </section>

      <SummaryCards totalOrders={stats.totalOrders} revenue={stats.revenue} pending={stats.pending} />

      <section className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Orders</h2>
          <Link to="/orders" className="text-blue-600">See all</Link>
        </div>
        {loading && <div className="text-gray-600">Loading…</div>}
        {error && <div className="text-red-600">{error}</div>}
        {!loading && !error && (
          <ul className="divide-y">
            {stats.recent.map((o) => (
              <li key={o.id} className="py-2 flex items-center justify-between">
                <div className="text-sm text-gray-700">#{o.id} · {o.customerName}</div>
                <div className="text-sm font-medium">${o.totalPrice}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
