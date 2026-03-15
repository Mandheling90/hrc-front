'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import { useHospitalRouter } from '@/hooks'

const ECONSULT_DOCTOR_ID_KEY = 'econsult_doctor_id'

export default function EConsultLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext()
  const router = useHospitalRouter()
  const pathname = usePathname()
  const isLoginPage = pathname?.includes('/e-consult/login')
  const isListPage = pathname?.includes('/e-consult/list')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // e-consult 자문의 로그인 페이지는 항상 접근 가능
    if (isLoginPage) {
      setIsReady(true)
      return
    }

    // /list 경로: econsult_doctor_id 체크
    if (isListPage) {
      const doctorId = localStorage.getItem(ECONSULT_DOCTOR_ID_KEY)
      if (!doctorId) {
        router.push('/network/e-consult/login')
      } else {
        setIsReady(true)
      }
      return
    }

    // 그 외 e-consult 페이지: 일반 로그인 체크
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    } else if (!isLoading) {
      setIsReady(true)
    }
  }, [isLoginPage, isListPage, isLoading, isAuthenticated, router])

  if (!isReady) {
    return null
  }

  return <>{children}</>
}
