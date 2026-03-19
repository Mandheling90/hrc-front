'use client'

import { useRouter } from 'next/navigation'

/**
 * useRouter 래퍼 (서브도메인 별도 배포 방식에서는 prefix 불필요)
 * 기존 import 경로 호환을 위해 유지
 *
 * 사용법:
 *   import { useHospitalRouter } from '@/hooks/useHospitalRouter'
 *   const router = useHospitalRouter()
 *   router.push('/login')
 */
export function useHospitalRouter() {
  return useRouter()
}
