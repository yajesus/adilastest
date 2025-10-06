import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateUser } from '../api/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authenticateUser(email, password)
      localStorage.setItem('auth', 'true')
      navigate('/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      backgroundImage: 'radial-gradient(ellipse at top, #eef2ff 0%, transparent 60%), radial-gradient(ellipse at bottom, #fef9c3 0%, transparent 60%)'
    }}>
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-8 shadow-lg">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center">
            <span className="text-blue-700 font-bold">OD</span>
          </div>
          <h1 className="text-2xl font-bold text-center">Welcome back</h1>
          <p className="text-sm text-gray-600 text-center mb-6">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                className="w-full border rounded p-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                className="w-full border rounded p-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center justify-start text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Remember me</span>
              </label>
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <button disabled={loading} className="w-full bg-blue-600 text-white px-4 py-2 rounded" type="submit">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">By signing in, you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}