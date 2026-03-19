'use client'

import React from 'react'
import NextLink from 'next/link'

type LinkProps = React.ComponentProps<typeof NextLink>

/**
 * Link 컴포넌트 (서브도메인 별도 배포 방식에서는 prefix 불필요)
 * 기존 import 경로 호환을 위해 유지
 *
 * 사용법: import Link from '@/components/atoms/HospitalLink'
 */
const HospitalLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function HospitalLink(
  { href, ...props },
  ref
) {
  return <NextLink ref={ref} href={href} {...props} />
})

export default HospitalLink
