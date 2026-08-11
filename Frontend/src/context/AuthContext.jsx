import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginUser, registerUser } from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setError('')
    setLoading(true)
    try {
      const data = await loginUser(username, password)
      setUser(data.user)
      setIsAuthenticated(true)
      setError('')
      return data
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, password) => {
    setError('')
    setLoading(true)
    try {
      const data = await registerUser(username, password)
      setError('')
      return data
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your details.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'token=;path=/;max-age=0'
    }
    setUser(null)
    setIsAuthenticated(false)
    setError('')
  }

  const value = useMemo(
    () => ({ user, isAuthenticated, loading, error, login, register, logout, setError }),
    [user, isAuthenticated, loading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
