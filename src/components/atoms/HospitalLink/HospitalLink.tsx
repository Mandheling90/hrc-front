'use client'

import React from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { getHospitalFromPath, prefixHospitalPath } from '@/utils/hospital'

type LinkProps = React.ComponentProps<typeof NextLink>

/**
 * 병원 prefix를 자동으로 추가하는 Link 컴포넌트
 * next/link의 Link를 대체하여 사용
 *
 * 사용법: import Link from '@/components/atoms/HospitalLink'
 */
const HospitalLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function HospitalLink(
  { href, ...props },
  ref
) {
  const pathname = usePathname()
  const hospitalId = getHospitalFromPath(pathname)

  let resolvedHref = href
  if (hospitalId && typeof href === 'string') {
    resolvedHref = prefixHospitalPath(href, hospitalId)
  } else if (hospitalId && typeof href === 'object' && href.pathname) {
    resolvedHref = {
      ...href,
      pathname: prefixHospitalPath(href.pathname, hospitalId)
    }
  }

  return <NextLink ref={ref} href={resolvedHref} {...props} />
})

export default HospitalLink
