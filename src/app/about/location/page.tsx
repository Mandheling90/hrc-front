'use client'

import { useHospital } from '@/hooks'
import { LocationPageGuro } from './LocationPageGuro'
import { LocationPageAnam } from './LocationPageAnam'
import { LocationPageAnsan } from './LocationPageAnsan'

export default function LocationPage() {
  const { isGuro, isAnam, isAnsan } = useHospital()

  // 구로병원은 별도 컴포넌트로 분리
  if (isGuro) {
    return <LocationPageGuro />
  }

  // 안산병원은 별도 컴포넌트로 분리
  if (isAnsan) {
    return <LocationPageAnsan />
  }

  // 안암병원은 별도 컴포넌트로 분리
  if (isAnam) {
    return <LocationPageAnam />
  }

  // 기본값 (안암)
  return <LocationPageAnam />
}
