'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HospitalContextType, HospitalId } from '@/types/hospital'
import { getCurrentHospitalId, getHospitalConfig } from '@/config/hospitals'
import { getPageContent } from '@/config/pageContents'
import { getHospitalFromPath } from '@/utils/hospital'

// Context 생성
const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

// Provider Props
interface HospitalProviderProps {
  children: React.ReactNode
  // 테스트나 특수한 경우를 위해 병원 ID를 직접 지정할 수 있음
  hospitalId?: HospitalId
}

// Hospital Provider 컴포넌트
export const HospitalProvider: React.FC<HospitalProviderProps> = ({ children, hospitalId: overrideHospitalId }) => {
  const pathname = usePathname()

  const value = useMemo<HospitalContextType>(() => {
    // 우선순위: prop override > URL pathname > 환경변수
    const hospitalId = overrideHospitalId || getHospitalFromPath(pathname) || getCurrentHospitalId()
    const hospital = getHospitalConfig(hospitalId)
    const pageContent = getPageContent(hospitalId)

    return {
      hospital,
      pageContent,
      hospitalId,
      isAnam: hospitalId === 'anam',
      isGuro: hospitalId === 'guro',
      isAnsan: hospitalId === 'ansan'
    }
  }, [overrideHospitalId, pathname])

  return <HospitalContext.Provider value={value}>{children}</HospitalContext.Provider>
}

// useHospital Hook
export const useHospital = (): HospitalContextType => {
  const context = useContext(HospitalContext)

  if (context === undefined) {
    throw new Error('useHospital must be used within a HospitalProvider')
  }

  return context
}

// Context 직접 export (필요한 경우)
export { HospitalContext }
