'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client/react'
import { INITIATE_VERIFICATION_MUTATION, COMPLETE_VERIFICATION_MUTATION } from '@/graphql/verification/mutations'
import { CHECK_VERIFICATION_DUPLICATE_QUERY } from '@/graphql/verification/queries'
import type { NiceVerifiedData, NiceCallbackData, UseNiceVerificationReturn, UseNiceVerificationOptions } from '@/lib/nice/types'

export function useNiceVerification(options?: UseNiceVerificationOptions): UseNiceVerificationReturn {
  const checkDuplicate = options?.checkDuplicate ?? false
  const [isVerified, setIsVerified] = useState(false)
  const [verifiedData, setVerifiedData] = useState<NiceVerifiedData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDuplicate, setIsDuplicate] = useState(false)
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
  const [checkVerificationDuplicate] = useLazyQuery<{
    checkVerificationDuplicate: { isDuplicate: boolean; message: string | null }
  }>(CHECK_VERIFICATION_DUPLICATE_QUERY, { fetchPolicy: 'network-only' })

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
          const verified: NiceVerifiedData = {
            name: result.name,
            phone: result.phone,
            birthDate: result.birthDate,
            gender: result.gender,
            di: result.di,
            ci: result.ci,
            authMethod: result.authMethod,
            nationalInfo: result.nationalInfo,
            verificationToken: result.verificationToken
          }

          // 중복 가입 체크
          if (checkDuplicate && verified.verificationToken) {
            try {
              const { data: dupData } = await checkVerificationDuplicate({
                variables: {
                  verificationToken: verified.verificationToken
                }
              })
              if (dupData?.checkVerificationDuplicate?.isDuplicate) {
                setIsDuplicate(true)
                setError(dupData.checkVerificationDuplicate.message || '이미 가입된 회원입니다.')
                setIsLoading(false)
                cleanup()
                return
              }
            } catch {
              // 중복 체크 실패 시에도 가입 진행 허용
            }
          }

          setVerifiedData(verified)
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
  }, [cleanup, completeVerification, checkDuplicate, checkVerificationDuplicate])

  const requestVerification = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const returnUrl = `${window.location.origin}/nice/callback`

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
    setIsDuplicate(false)
    sessionIdRef.current = null
    cleanup()
  }, [cleanup])

  return {
    requestVerification,
    isVerified,
    verifiedData,
    isLoading,
    error,
    isDuplicate,
    reset
  }
}
