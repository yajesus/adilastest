type Customer = { id: number; firstName: string; lastName: string; email: string; address?: { city?: string } }

export default function CustomerList({ customers }: { customers: Customer[] }) {
  if (!customers?.length) {
    return <div className="text-gray-600">No customers found.</div>
  }
  return (
    <div>
      {/* Mobile cards */}
      <ul className="grid gap-3 sm:hidden">
        {customers.map((c) => (
          <li key={c.id} className="rounded border bg-white p-4 shadow-sm">
            <div className="font-medium">{c.firstName} {c.lastName}</div>
            <div className="text-sm text-gray-600">{c.email}</div>
            <div className="text-sm text-gray-500 mt-1">{c.address?.city}</div>
          </li>
        ))}
      </ul>
      {/* Desktop table */}
      <table className="hidden sm:table w-full bg-white rounded shadow overflow-hidden">
        <thead>
          <tr>
            <th className="p-3 text-left bg-gray-50">Name</th>
            <th className="p-3 text-left bg-gray-50">Email</th>
            <th className="p-3 text-left bg-gray-50">City</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.firstName} {c.lastName}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.address?.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
