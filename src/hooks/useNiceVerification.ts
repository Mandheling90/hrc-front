'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useMutation } from '@apollo/client/react'
import { INITIATE_VERIFICATION_MUTATION, COMPLETE_VERIFICATION_MUTATION } from '@/graphql/verification/mutations'
import type { NiceVerifiedData, NiceCallbackData, UseNiceVerificationReturn } from '@/lib/nice/types'

const DEV_MODE = process.env.NEXT_PUBLIC_NICE_DEV_MODE === 'true'

const DEV_DUMMY_DATA: NiceVerifiedData = {
  name: '홍길동',
  phone: '010-1234-5678',
  birthDate: '1990-01-01',
  gender: 'M',
  di: 'DEV_DI_' + Date.now(),
  ci: 'DEV_CI_' + Date.now(),
  authMethod: 'M',
  nationalInfo: null,
  verificationToken: 'DEV_TOKEN_' + Date.now()
}

export function useNiceVerification(): UseNiceVerificationReturn {
  const [isVerified, setIsVerified] = useState(false)
  const [verifiedData, setVerifiedData] = useState<NiceVerifiedData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const popupRef = useRef<Window | null>(null)
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sessionIdRef = useRef<string | null>(null)

  const [initiateVerification] = useMutation<{
    initiateVerification: { authUrl: string; sessionId: string }
  }>(INITIATE_VERIFICATION_MUTATION)
  const [completeVerification] = useMutation<{
    completeVerification: {
      authMethod: string
      birthDate: string
      ci: string
      di: string
      gender: string
      name: string
      nationalInfo: string | null
      phone: string | null
      verificationToken: string | null
    }
  }>(COMPLETE_VERIFICATION_MUTATION)

  const cleanup = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
    popupRef.current = null
  }, [])

  // postMessage 리스너: 콜백 페이지에서 webTransactionId를 받음
  useEffect(() => {
    const handleMessage = async (event: MessageEvent<NiceCallbackData>) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== 'NICE_CALLBACK') return

      const { webTransactionId } = event.data
      const sessionId = sessionIdRef.current

      if (!sessionId || !webTransactionId) {
        setError('인증 세션 정보가 없습니다.')
        setIsLoading(false)
        cleanup()
        return
      }

      try {
        // completeVerification GraphQL mutation 호출
        const { data } = await completeVerification({
          variables: {
            input: { sessionId, webTransactionId }
          }
        })

        const result = data?.completeVerification
        if (result) {
          setVerifiedData({
            name: result.name,
            phone: result.phone,
            birthDate: result.birthDate,
            gender: result.gender,
            di: result.di,
            ci: result.ci,
            authMethod: result.authMethod,
            nationalInfo: result.nationalInfo,
            verificationToken: result.verificationToken
          })
          setIsVerified(true)
          setError(null)
        } else {
          setError('인증 결과를 받지 못했습니다.')
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : '본인인증 완료 처리 중 오류가 발생했습니다.'
        setError(message)
      } finally {
        setIsLoading(false)
        cleanup()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      cleanup()
    }
  }, [cleanup, completeVerification])

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
      const returnUrl = `${window.location.origin}/auth/nice/callback`

      // 1) initiateVerification GraphQL mutation 호출
      const { data } = await initiateVerification({
        variables: {
          input: { returnUrl }
        }
      })

      if (!data?.initiateVerification) {
        throw new Error('인증 요청에 실패했습니다.')
      }
      const { authUrl, sessionId } = data.initiateVerification
      sessionIdRef.current = sessionId

      // 2) 팝업 열기
      const popup = window.open(authUrl, 'nicePopup', 'width=500,height=600,scrollbars=yes')
      if (!popup) {
        throw new Error('팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.')
      }
      popupRef.current = popup

      // 3) 팝업 닫힘 감지 (polling)
      pollTimerRef.current = setInterval(() => {
        if (popupRef.current && popupRef.current.closed) {
          cleanup()
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
  }, [cleanup, isVerified, initiateVerification])

  const reset = useCallback(() => {
    setIsVerified(false)
    setVerifiedData(null)
    setIsLoading(false)
    setError(null)
    sessionIdRef.current = null
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
