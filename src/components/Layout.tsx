import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
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
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/orders" className={linkClass}>Orders</NavLink>
            <NavLink to="/create-order" className={linkClass}>Create</NavLink>
            <NavLink to="/customers" className={linkClass}>Customers</NavLink>
          </nav>
          <div className="hidden md:block">
            <button onClick={logout} className="text-sm text-red-600">Logout</button>
          </div>
          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center rounded border p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 014.5 6h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm.75 4.5a.75.75 0 000 1.5h15a.75.75 0 000-1.5h-15z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto p-3 space-y-2">
              <NavLink to="/dashboard" className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`} onClick={() => setOpen(false)}>Dashboard</NavLink>
              <NavLink to="/orders" className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`} onClick={() => setOpen(false)}>Orders</NavLink>
              <NavLink to="/create-order" className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`} onClick={() => setOpen(false)}>Create</NavLink>
              <NavLink to="/customers" className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`} onClick={() => setOpen(false)}>Customers</NavLink>
              <button onClick={() => { setOpen(false); logout(); }} className="block w-full text-left px-3 py-2 rounded text-red-600">Logout</button>
            </div>
          </div>
        )}
      </header>
      <main className="max-w-6xl mx-auto p-4 sm:p-6">{children}</main>
    </div>
  )
}

