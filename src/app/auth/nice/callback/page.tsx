'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { NicePostMessageData } from '@/lib/nice/types'

function NiceCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const processCallback = async () => {
      const encData = searchParams.get('enc_data')
      const tokenVersionId = searchParams.get('token_version_id')
      const integrityValue = searchParams.get('integrity_value')

      if (!encData || !tokenVersionId || !integrityValue) {
        sendResult({ type: 'NICE_VERIFICATION_RESULT', success: false, error: '인증 응답 데이터가 없습니다.' })
        setErrorMessage('인증 응답 데이터가 없습니다.')
        setStatus('error')
        return
      }

      try {
        const response = await fetch('/api/nice/decrypt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tokenVersionId, encData, integrityValue })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || '인증 결과 처리에 실패했습니다.')
        }

        const data = await response.json()

        sendResult({
          type: 'NICE_VERIFICATION_RESULT',
          success: true,
          data: {
            name: data.name,
            phone: data.phone,
            birthDate: data.birthDate,
            gender: data.gender,
            di: data.di,
            ci: data.ci
          }
        })
        setStatus('success')

        setTimeout(() => window.close(), 1000)
      } catch (err) {
        const message = err instanceof Error ? err.message : '본인인증 처리 중 오류가 발생했습니다.'
        sendResult({ type: 'NICE_VERIFICATION_RESULT', success: false, error: message })
        setErrorMessage(message)
        setStatus('error')
      }
    }

    processCallback()
  }, [searchParams])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'Pretendard, sans-serif',
        padding: '20px'
      }}
    >
      {status === 'processing' && (
        <p style={{ fontSize: '16px', color: '#666' }}>본인인증 결과를 처리하고 있습니다...</p>
      )}
      {status === 'success' && (
        <p style={{ fontSize: '16px', color: '#2e7d32' }}>본인인증이 완료되었습니다. 잠시 후 창이 닫힙니다.</p>
      )}
      {status === 'error' && (
        <>
          <p style={{ fontSize: '16px', color: '#d32f2f', marginBottom: '16px' }}>{errorMessage}</p>
          <button
            onClick={() => window.close()}
            style={{
              padding: '8px 24px',
              fontSize: '14px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: '#fff'
            }}
          >
            닫기
          </button>
        </>
      )}
    </div>
  )
}

export default function NiceCallbackPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '40px' }}>처리 중...</p>}>
      <NiceCallbackContent />
    </Suspense>
  )
}

function sendResult(data: NicePostMessageData) {
  if (window.opener) {
    window.opener.postMessage(data, window.location.origin)
  }
}
