'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthUser } from '@/types/auth'

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (token: string, refreshToken: string, user: AuthUser) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token'
const AUTH_USER_KEY = 'auth_user'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
    const storedUser = localStorage.getItem(AUTH_USER_KEY)

    if (storedToken && storedUser) {
      try {
        const parsed: AuthUser = JSON.parse(storedUser)
        // DEV 전용: testuser 계정일 때 doctorId 임시 주입
        if (process.env.NODE_ENV === 'development' && parsed.userId === 'testuser' && !parsed.doctorId) {
          parsed.doctorId = '55030'
        }
        setToken(storedToken)
        setUser(parsed)
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
      }
    }

    setIsLoading(false)
  }, [])

  const setAuth = useCallback((newToken: string, newRefreshToken: string, newUser: AuthUser) => {
    localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, newRefreshToken)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const clearAuth = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading,
      setAuth,
      clearAuth
    }),
    [user, token, isLoading, setAuth, clearAuth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}

export { AuthContext }
