import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as apiLogin } from '../services/authService'
import { AuthContext } from '../AuthContext'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) return setError('Please enter email and password')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    try {
      setLoading(true)
      const res = await apiLogin({ email, password })
      login(res.token, res.user)
      setTimeout(() => navigate('/'), 100)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" autoComplete="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{ marginTop: 16 }}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? <><span className="spinner" />Logging in...</> : 'Login'}
          </button>
        </div>
        <p style={{ textAlign: 'center', marginTop: 12, color: '#6b7280', fontSize: '14px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>Register</Link>
        </p>
      </form>
    </div>
  )
}
