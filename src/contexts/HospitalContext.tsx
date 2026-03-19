'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { HospitalContextType, HospitalId } from '@/types/hospital'
import { getCurrentHospitalId, getHospitalConfig } from '@/config/hospitals'
import { getPageContent } from '@/config/pageContents'

const VALID_HOSPITALS: HospitalId[] = ['anam', 'guro', 'ansan']

/**
 * 브라우저 hostname에서 병원 ID 추출
 * anamrefer.kumc.or.kr → anam
 * gurorefer.vercel.app → guro
 */
function getHospitalFromHostname(): HospitalId | null {
  if (typeof window === 'undefined') return null
  const hostname = window.location.hostname
  for (const id of VALID_HOSPITALS) {
    if (hostname.includes(id)) return id
  }
  return null
}

// Context 생성
const HospitalContext = createContext<HospitalContextType | undefined>(undefined)

// Provider Props
interface HospitalProviderProps {
  children: React.ReactNode
  hospitalId?: HospitalId
}

// Hospital Provider 컴포넌트
export const HospitalProvider: React.FC<HospitalProviderProps> = ({ children, hospitalId: overrideHospitalId }) => {
  const value = useMemo<HospitalContextType>(() => {
    // 우선순위: prop override > hostname 감지 > 환경변수
    const hospitalId = overrideHospitalId || getHospitalFromHostname() || getCurrentHospitalId()
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
  }, [overrideHospitalId])

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
