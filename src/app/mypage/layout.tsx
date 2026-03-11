'use client'

import React, { useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useHospitalRouter } from '@/hooks'

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useHospitalRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
