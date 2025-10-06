import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('auth')
    navigate('/', { replace: true })
  }
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`

  return (
    <div>
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/dashboard" className="font-bold text-xl tracking-tight">OrderDash</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/orders" className={linkClass}>Orders</NavLink>
            <NavLink to="/create-order" className={linkClass}>Create</NavLink>
            <NavLink to="/customers" className={linkClass}>Customers</NavLink>
          </nav>
          <button onClick={logout} className="text-sm text-red-600">Logout</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 sm:p-6">{children}</main>
    </div>
  )
}

