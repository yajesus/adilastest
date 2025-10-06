type Props = {
  totalOrders?: number;
  revenue?: number;
  pending?: number;
}

export default function SummaryCards({ totalOrders = 0, revenue = 0, pending = 0 }: Props) {
  const cards = [
    { title: 'Total Orders', value: totalOrders.toLocaleString(), accent: 'from-blue-500/10 to-blue-500/0' },
    { title: 'Revenue', value: `$${revenue.toLocaleString()}` , accent: 'from-emerald-500/10 to-emerald-500/0'},
    { title: 'Pending Orders', value: pending.toLocaleString(), accent: 'from-amber-500/10 to-amber-500/0' },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.title} className="rounded border bg-white p-4 shadow-sm relative overflow-hidden">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent}`} />
          <div className="relative">
            <div className="text-sm text-gray-500">{c.title}</div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
