import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOrderById } from '../api/api'

export default function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    fetchOrderById(id, { signal: controller.signal })
      .then(setOrder)
      .catch((e) => setError(e.message || 'Error loading order'))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [id])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!order) return <div className="p-6">Not found</div>

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Customer</div>
          <div className="text-lg">{order.customerName}</div>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Status</div>
          <div className="text-lg capitalize">{order.status}</div>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">Total price</div>
          <div className="text-lg">${order.totalPrice}</div>
        </div>
        <div className="rounded border bg-white p-4">
          <div className="text-sm text-gray-500">CreateDate</div>
          <div className="text-lg">{new Date(order.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
