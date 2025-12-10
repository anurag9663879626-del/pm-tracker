import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as apiRegister } from '../services/authService'
import { AuthContext } from '../AuthContext'

export default function Register () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) return setError('Email and password are required')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    try {
      setLoading(true)
      const res = await apiRegister({ name, email, password })
      login(res.token, res.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? <span className="spinner" /> : 'Register'}</button>
      </form>
    </div>
  )
}
