'use client'

import { useCallback } from 'react'

interface DaumPostcodeData {
  zonecode: string
  roadAddress: string
  jibunAddress: string
  autoRoadAddress: string
  autoJibunAddress: string
  buildingName: string
}

interface DaumPostcodeInstance {
  open: () => void
}

interface DaumPostcodeConstructor {
  new (options: { oncomplete: (data: DaumPostcodeData) => void }): DaumPostcodeInstance
}

interface DaumNamespace {
  Postcode: DaumPostcodeConstructor
}

declare global {
  interface Window {
    daum?: { Postcode: DaumPostcodeConstructor }
  }
}

export interface PostcodeResult {
  zipCode: string
  address: string
}

export function useDaumPostcode(onComplete: (result: PostcodeResult) => void) {
  const openPostcode = useCallback(() => {
    if (!window.daum?.Postcode) {
      alert('우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }

    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        const address = data.roadAddress || data.jibunAddress
        onComplete({
          zipCode: data.zonecode,
          address
        })
      }
    }).open()
  }, [onComplete])

  return { openPostcode }
}
