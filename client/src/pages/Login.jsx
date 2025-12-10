import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? <span className="spinner" /> : 'Login'}</button>
      </form>
    </div>
  )
}
