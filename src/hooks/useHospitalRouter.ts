'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { getHospitalFromPath, prefixHospitalPath } from '@/utils/hospital'

type NavigateOptions = Parameters<ReturnType<typeof useRouter>['push']>[1]

/**
 * 병원 prefix를 자동으로 추가하는 useRouter 래퍼
 * next/navigation의 useRouter를 대체하여 사용
 *
 * 사용법:
 *   import { useHospitalRouter } from '@/hooks/useHospitalRouter'
 *   const router = useHospitalRouter()
 *   router.push('/login')  // 자동으로 /anam/login 등으로 변환
 */
export function useHospitalRouter() {
  const router = useRouter()
  const pathname = usePathname()
  const hospitalId = getHospitalFromPath(pathname)

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      const resolved = hospitalId ? prefixHospitalPath(href, hospitalId) : href
      router.push(resolved, options)
    },
    [router, hospitalId]
  )

  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      const resolved = hospitalId ? prefixHospitalPath(href, hospitalId) : href
      router.replace(resolved, options)
    },
    [router, hospitalId]
  )

  return useMemo(
    () => ({
      ...router,
      push,
      replace
    }),
    [router, push, replace]
  )
}
