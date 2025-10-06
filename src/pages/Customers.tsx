import { useEffect, useState } from 'react'
import Loader from '../components/Loader.jsx'
import CustomerList from '../components/CustomerList'

type Customer = { id: number; firstName: string; lastName: string; email: string; address?: { city?: string } }

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    fetch('https://dummyjson.com/users?limit=10', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to load customers'))))
      .then((d) => setCustomers(d.users || []))
      .catch(() => {
        // local fallback when offline
        setCustomers([
          { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', address: { city: 'Springfield' } },
          { id: 2, firstName: 'Bob', lastName: 'Lee', email: 'bob@example.com', address: { city: 'Riverside' } },
        ])
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {loading && <Loader />}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && <CustomerList customers={customers} />}
    </div>
  );
}
