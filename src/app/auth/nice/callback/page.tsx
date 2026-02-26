'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { NiceCallbackData } from '@/lib/nice/types'

function NiceCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const webTransactionId = searchParams.get('web_transaction_id')

    if (!webTransactionId) {
      setErrorMessage('인증 응답 데이터가 없습니다.')
      setStatus('error')
      return
    }

    // 부모 창에 webTransactionId 전달
    if (window.opener) {
      const data: NiceCallbackData = {
        type: 'NICE_CALLBACK',
        webTransactionId
      }
      window.opener.postMessage(data, window.location.origin)
    }

    setStatus('success')
    setTimeout(() => window.close(), 1000)
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
