import React, { createContext, useState, useEffect } from 'react'
import { getAuthUser, clearAuth, saveAuth } from './services/authService'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = getAuthUser()
    if (u) setUser(u)
    setLoading(false)
  }, [])

  const login = (token, user) => {
    saveAuth(token, user)
    setUser(user)
  }

  const logout = () => {
    clearAuth()
    setUser(null)
  }

  const value = { user, login, logout, loading, isAuthenticated: !!user }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
