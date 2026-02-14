'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type {
  NiceVerifiedData,
  NicePostMessageData,
  NiceRequestResponse,
  UseNiceVerificationReturn
} from '@/lib/nice/types'

const NICE_CHECKPLUS_URL = 'https://nice.checkplus.co.kr/CheckPlusSa498'
const DEV_MODE = process.env.NEXT_PUBLIC_NICE_DEV_MODE === 'true'

const DEV_DUMMY_DATA: NiceVerifiedData = {
  name: '홍길동',
  phone: '010-1234-5678',
  birthDate: '1990-01-01',
  gender: 'M',
  di: 'DEV_DI_' + Date.now(),
  ci: 'DEV_CI_' + Date.now()
}

export function useNiceVerification(): UseNiceVerificationReturn {
  const [isVerified, setIsVerified] = useState(false)
  const [verifiedData, setVerifiedData] = useState<NiceVerifiedData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const popupRef = useRef<Window | null>(null)
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const cleanup = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
    popupRef.current = null
  }, [])

  // postMessage 리스너
  useEffect(() => {
    const handleMessage = (event: MessageEvent<NicePostMessageData>) => {
      // origin 검증: 자기 자신 origin만 허용
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== 'NICE_VERIFICATION_RESULT') return

      cleanup()

      if (event.data.success && event.data.data) {
        setVerifiedData(event.data.data)
        setIsVerified(true)
        setError(null)
      } else {
        setError(event.data.error || '본인인증에 실패했습니다.')
      }

      setIsLoading(false)
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      cleanup()
    }
  }, [cleanup])

  const requestVerification = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    // 개발 모드: 시뮬레이션
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setVerifiedData(DEV_DUMMY_DATA)
      setIsVerified(true)
      setIsLoading(false)
      return
    }

    try {
      // 1) 서버에서 암호화 토큰 요청
      const response = await fetch('/api/nice/request', { method: 'POST' })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '인증 요청에 실패했습니다.')
      }

      const { tokenVersionId, encData, integrityValue }: NiceRequestResponse = await response.json()

      // 2) 팝업 열기
      const popup = window.open('', 'nicePopup', 'width=500,height=600,scrollbars=yes')
      if (!popup) {
        throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.')
      }
      popupRef.current = popup

      // 3) 팝업 안에 hidden form을 생성하여 NICE로 submit
      const formHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>본인인증 진행 중...</title></head>
        <body>
          <form id="niceForm" method="post" action="${NICE_CHECKPLUS_URL}">
            <input type="hidden" name="m" value="service" />
            <input type="hidden" name="token_version_id" value="${tokenVersionId}" />
            <input type="hidden" name="enc_data" value="${encData}" />
            <input type="hidden" name="integrity_value" value="${integrityValue}" />
          </form>
          <script>document.getElementById('niceForm').submit();</script>
        </body>
        </html>
      `
      popup.document.write(formHtml)
      popup.document.close()

      // 4) 팝업 닫힘 감지 (polling)
      pollTimerRef.current = setInterval(() => {
        if (popupRef.current && popupRef.current.closed) {
          cleanup()
          // 인증 결과를 받지 못한 채 팝업이 닫힌 경우
          if (!isVerified) {
            setIsLoading(false)
          }
        }
      }, 500)
    } catch (err) {
      const message = err instanceof Error ? err.message : '본인인증 요청 중 오류가 발생했습니다.'
      setError(message)
      setIsLoading(false)
      cleanup()
    }
  }, [cleanup, isVerified])

  const reset = useCallback(() => {
    setIsVerified(false)
    setVerifiedData(null)
    setIsLoading(false)
    setError(null)
    cleanup()
  }, [cleanup])

  return {
    requestVerification,
    isVerified,
    verifiedData,
    isLoading,
    error,
    reset
  }
}
