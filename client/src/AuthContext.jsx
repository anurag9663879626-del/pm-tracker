import React, { createContext, useState, useEffect } from 'react'
import { getAuthUser, clearAuth, saveAuth } from './services/authService'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getAuthUser()
    if (u) setUser(u)
  }, [])

  const login = (token, user) => {
    saveAuth(token, user)
    setUser(user)
  }

  const logout = () => {
    clearAuth()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
