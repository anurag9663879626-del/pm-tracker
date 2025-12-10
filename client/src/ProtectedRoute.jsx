import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

export default function ProtectedRoute ({ children }) {
  const { user, loading, isAuthenticated } = useContext(AuthContext)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
        <div className="spinner" style={{ display: 'inline-block', marginRight: 8 }} />
        <span>Loading...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
