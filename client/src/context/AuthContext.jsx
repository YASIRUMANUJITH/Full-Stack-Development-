import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/boards'

const AuthContext = createContext(null)
const TOKEN_KEY = 'syncboard:token'
const USER_KEY = 'syncboard:auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener('auth:expired', onExpired)
    return () => window.removeEventListener('auth:expired', onExpired)
  }, [])

  const login = useCallback(async (data) => {
    const result = await authApi.login(data)
    localStorage.setItem(TOKEN_KEY, result.token)
    setUser(result.user)
    return result
  }, [])

  const register = useCallback(async (data) => {
    const result = await authApi.register(data)
    localStorage.setItem(TOKEN_KEY, result.token)
    setUser(result.user)
    return result
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
