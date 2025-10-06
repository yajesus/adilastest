import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrderLocal } from '../api/api'
export default function CreateOrder() {
  const [form, setForm] = useState<{ customerName: string; status: string; totalPrice: string | number; createdAt: string }>({ customerName: '', status: 'pending', totalPrice: '', createdAt: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.customerName) next.customerName = 'Customer is required'
    if (!form.status) next.status = 'Status is required'
    if (form.totalPrice === '' || isNaN(Number(form.totalPrice))) next.totalPrice = 'Valid total required'
    return next
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length) return
    setSubmitting(true)
    const created = createOrderLocal({
      customerName: form.customerName,
      status: form.status,
      totalPrice: Number(form.totalPrice),
      createdAt: form.createdAt || new Date().toISOString(),
    })
    setSubmitting(false)
    navigate(`/orders/${created.id}`)
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4 rounded border bg-white p-4 shadow-sm">
        <div>
          <label className="block text-sm mb-1">Customer name</label>
          <input className="w-full border rounded p-2" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          {errors.customerName && <p className="text-red-500">{errors.customerName}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select className="w-full border rounded p-2 bg-white" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Total price</label>
          <input className="w-full border rounded p-2" value={form.totalPrice} onChange={(e) => setForm({ ...form, totalPrice: e.target.value })} />
          {errors.totalPrice && <p className="text-red-500">{errors.totalPrice}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">CreateDate (optional)</label>
          <input className="w-full border rounded p-2" type="datetime-local" onChange={(e) => setForm({ ...form, createdAt: e.target.value ? new Date(e.target.value).toISOString() : '' })} />
        </div>
        <button disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {submitting ? 'Saving...' : 'Create order'}
        </button>
      </form>
    </div>
  )
}