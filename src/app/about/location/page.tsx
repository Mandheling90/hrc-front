'use client'

import { useHospital } from '@/hooks'
import { LocationPageGuro } from './LocationPageGuro'
import { LocationPageAnam } from './LocationPageAnam'

export default function LocationPage() {
  const { isGuro, isAnam, isAnsan } = useHospital()

  // 구로병원은 별도 컴포넌트로 분리
  if (isGuro) {
    return <LocationPageGuro />
  }

  // 안암/안산병원은 별도 컴포넌트로 분리
  if (isAnam || isAnsan) {
    return <LocationPageAnam />
  }

  // 기본값 (안암)
  return <LocationPageAnam />
}
