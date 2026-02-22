'use client'

import { usePathname } from 'next/navigation'
import { stripHospitalPrefix } from '@/utils/hospital'

/**
 * usePathname()에서 병원 prefix를 제거한 경로를 반환
 *
 * 예: URL이 /anam/login일 때 → '/login' 반환
 * Header, Footer 등에서 경로 비교 시 사용
 */
export function useHospitalPathname(): string {
  const pathname = usePathname()
  return stripHospitalPrefix(pathname)
}
