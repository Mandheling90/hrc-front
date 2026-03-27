'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Button } from '@/components/atoms/Button/Button'
import { RESET_PASSWORD_BY_VERIFICATION_MUTATION } from '@/graphql/verification/mutations'
import styles from './ResetPasswordForm.module.scss'

export const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useHospitalRouter()
  const userId = searchParams.get('userId') || ''
  const verificationToken = searchParams.get('verificationToken') || ''

  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [requested, setRequested] = useState(false)

  const [resetPasswordByVerification, { loading }] = useMutation<{
    resetPasswordByVerification: { message: string; success: boolean }
  }>(RESET_PASSWORD_BY_VERIFICATION_MUTATION)

  // 파라미터가 유효하면 자동으로 임시비밀번호 발급 요청
  useEffect(() => {
    if (!userId || !verificationToken || requested) return

    const requestTempPassword = async () => {
      setRequested(true)
      try {
        const { data } = await resetPasswordByVerification({
          variables: {
            input: {
              userId,
              verificationToken
            }
          }
        })

        if (data?.resetPasswordByVerification?.success) {
          setIsSuccess(true)
        } else {
          setErrorMessage(data?.resetPasswordByVerification?.message || '임시비밀번호 발급에 실패했습니다.')
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : '임시비밀번호 발급 중 오류가 발생했습니다.'
        setErrorMessage(message)
      }
    }

    requestTempPassword()
  }, [userId, verificationToken, requested, resetPasswordByVerification])

  const handleGoLogin = () => {
    router.push('/login')
  }

  // 로딩 중
  if (loading || (!isSuccess && !errorMessage && userId && verificationToken)) {
    return (
      <div className={styles.resetPasswordForm}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>임시비밀번호 발급</h2>
          <p className={styles.description}>임시비밀번호를 발급하고 있습니다...</p>
        </div>
      </div>
    )
  }

  // 성공 화면
  if (isSuccess) {
    return (
      <div className={styles.resetPasswordForm}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>임시비밀번호 발급 완료</h2>
          <p className={styles.description}>
            가입하신 휴대폰 번호로 임시비밀번호가 발송되었습니다.
            <br />
            임시비밀번호로 로그인 후 비밀번호를 변경해주세요.
          </p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            type='button'
            variant='primary'
            size='medium'
            fullWidth
            className={styles.submitButton}
            onClick={handleGoLogin}
          >
            로그인
          </Button>
        </div>
      </div>
    )
  }

  // 잘못된 접근 (파라미터 없음)
  if (!userId || !verificationToken) {
    return (
      <div className={styles.resetPasswordForm}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>비밀번호 재설정</h2>
          <p className={styles.description}>잘못된 접근입니다. 비밀번호 찾기를 다시 진행해주세요.</p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            type='button'
            variant='primary'
            size='medium'
            fullWidth
            className={styles.submitButton}
            onClick={() => router.push('/find-user?tab=findPassword')}
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    )
  }

  // 에러 화면
  return (
    <div className={styles.resetPasswordForm}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>임시비밀번호 발급</h2>
        <p className={styles.description}>{errorMessage}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          type='button'
          variant='primary'
          size='medium'
          fullWidth
          className={styles.submitButton}
          onClick={() => router.push('/find-user?tab=findPassword')}
        >
          비밀번호 찾기
        </Button>
      </div>
    </div>
  )
}
