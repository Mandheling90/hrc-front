'use client'

import { usePathname } from 'next/navigation'

/**
 * usePathname 래퍼 (서브도메인 별도 배포 방식에서는 prefix 제거 불필요)
 * 기존 import 경로 호환을 위해 유지
 */
export function useHospitalPathname(): string {
  return usePathname()
}
