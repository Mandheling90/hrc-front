'use client'

import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { useClaimExistingEhrUser, useLogin, useSendTestEmail } from '@/hooks/useAuth'
import { useAuthContext } from '@/contexts/AuthContext'
import { useNiceVerification } from '@/hooks/useNiceVerification'
import Link from '@/components/atoms/HospitalLink'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './LoginForm.module.scss'

export interface LoginFormProps {
  /** 사용자명 입력 필드 레이블 (예: "아이디", "사번") */
  usernameLabel?: string
  /** 사용자명 입력 필드 name 속성 (예: "id", "employeeNumber") */
  usernameName?: string
  /** 설명 텍스트 */
  description: string
  /** 강조할 텍스트 (빨간색으로 표시) */
  highlightText?: string
  /** 하단 링크 표시 여부 */
  showLinks?: boolean
  /** 로그인 성공 후 이동할 경로 */
  redirectTo?: string
}

const extractErrorMessage = (err: unknown, fallback: string) => {
  if (CombinedGraphQLErrors.is(err)) {
    return (
      err.errors
        .map(graphQLError => graphQLError.message)
        .filter(Boolean)
        .join('\n') || fallback
    )
  }

  return err instanceof Error ? err.message : fallback
}

const isClaimRequiredError = (err: unknown) => {
  if (CombinedGraphQLErrors.is(err)) {
    return err.errors.some(graphQLError => graphQLError.message?.includes('CLAIM_REQUIRED'))
  }

  return err instanceof Error && err.message.includes('CLAIM_REQUIRED')
}

export const LoginForm: React.FC<LoginFormProps> = ({
  usernameLabel = '아이디',
  usernameName = 'id',
  description,
  highlightText,
  showLinks = true,
  redirectTo = '/'
}) => {
  const router = useHospitalRouter()
  const { login, loading } = useLogin()
  const { claimExistingEhrUser, loading: claimLoading } = useClaimExistingEhrUser()
  const { sendTestEmail, loading: testEmailLoading } = useSendTestEmail()
  const { setAuth, setLoginPassword } = useAuthContext()
  const {
    requestVerification,
    isVerified,
    verifiedData,
    isLoading: niceLoading,
    error: niceError,
    reset: resetNice
  } = useNiceVerification()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    [usernameName]: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [testEmailMessage, setTestEmailMessage] = useState('')
  const [showChangePwModal, setShowChangePwModal] = useState(false)
  // 로그인 성공 후 NICE 인증 대기 중인 인증 정보
  const pendingAuthRef = useRef<{ accessToken: string; refreshToken: string; user: any; mustChangePw: boolean } | null>(
    null
  )
  const pendingClaimRef = useRef<{ userId: string } | null>(null)

  const finalizeLogin = useCallback(
    (
      result: { accessToken: string; refreshToken: string; user: any; mustChangePw: boolean },
      password: string | null
    ) => {
      setAuth(result.accessToken, result.refreshToken, result.user)

      if (result.mustChangePw) {
        setLoginPassword(password)
        setShowChangePwModal(true)
        return
      }

      router.push(redirectTo)
    },
    [redirectTo, router, setAuth, setLoginPassword]
  )

  // NICE 인증 완료 시 최종 로그인 처리
  useEffect(() => {
    if (!isVerified) {
      return
    }

    if (pendingAuthRef.current) {
      const { accessToken, refreshToken, user, mustChangePw } = pendingAuthRef.current
      pendingAuthRef.current = null
      finalizeLogin({ accessToken, refreshToken, user, mustChangePw }, formData.password)
      return
    }

    if (!pendingClaimRef.current || !verifiedData?.verificationToken) {
      return
    }

    const pendingClaim = pendingClaimRef.current
    pendingClaimRef.current = null

    const processClaim = async () => {
      try {
        const result = await claimExistingEhrUser({
          userId: pendingClaim.userId,
          verificationToken: verifiedData.verificationToken!
        })

        if (!result) {
          throw new Error('기존 회원 인증 처리에 실패했습니다.')
        }

        setTestEmailMessage('')
        finalizeLogin(result, null)
      } catch (err) {
        setErrorMessage(extractErrorMessage(err, '기존 회원 인증 처리에 실패했습니다.'))
        resetNice()
      }
    }

    processClaim()
  }, [claimExistingEhrUser, finalizeLogin, formData.password, isVerified, resetNice, verifiedData])

  // NICE 인증 에러 시 초기화
  useEffect(() => {
    if (niceError && (pendingAuthRef.current || pendingClaimRef.current)) {
      pendingAuthRef.current = null
      pendingClaimRef.current = null
      setErrorMessage(niceError)
      resetNice()
    }
  }, [niceError, resetNice])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const userId = formData[usernameName]
    if (!userId || !formData.password) {
      setErrorMessage('아이디와 비밀번호를 입력해주세요.')
      return
    }

    try {
      const result = await login({ userId, password: formData.password })
      if (result) {
        setTestEmailMessage('')
        if (process.env.NEXT_PUBLIC_SKIP_NICE === 'true') {
          // NICE 인증 스킵 모드: 바로 로그인 처리
          finalizeLogin(result, formData.password)
        } else {
          // 운영 모드: 인증 정보를 임시 보관하고 NICE 본인인증 요청
          pendingAuthRef.current = {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
            mustChangePw: !!result.mustChangePw
          }
          requestVerification()
        }
      }
    } catch (err) {
      if (isClaimRequiredError(err)) {
        pendingClaimRef.current = {
          userId
        }
        setTestEmailMessage('')
        resetNice()
        requestVerification()
        return
      }

      setErrorMessage(extractErrorMessage(err, '로그인에 실패했습니다.'))
    }
  }

  const handleSendTestEmail = async () => {
    setErrorMessage('')
    setTestEmailMessage('')

    try {
      const result = await sendTestEmail(formData[usernameName])

      if (!result) {
        setTestEmailMessage('테스트 메일 응답이 없습니다.')
        return
      }

      if (result.success) {
        setTestEmailMessage('테스트 메일 발송 요청을 보냈습니다.')
        return
      }

      setTestEmailMessage(result.errorMessage || '테스트 메일 발송에 실패했습니다.')
    } catch (err) {
      const message = err instanceof Error ? err.message : '테스트 메일 발송에 실패했습니다.'
      setTestEmailMessage(message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errorMessage) setErrorMessage('')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // 설명 텍스트 렌더링
  const renderDescription = () => {
    if (highlightText && description.includes(highlightText)) {
      const parts = description.split(highlightText)
      return (
        <p className={styles.description}>
          {parts[0]}
          <span className={styles.highlight}>{highlightText}</span>
          {parts[1]}
        </p>
      )
    }
    return <p className={styles.description}>{description}</p>
  }

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>로그인</h2>
      {renderDescription()}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            type='text'
            id={usernameName}
            name={usernameName}
            placeholder={usernameLabel}
            value={formData[usernameName]}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='비밀번호'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type='button'
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <EyeIcon width={24} height={24} showPassword={showPassword} />
          </button>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <Button
          type='submit'
          variant='primary'
          size='medium'
          fullWidth
          className={styles.loginButton}
          disabled={loading || claimLoading || niceLoading}
        >
          {loading ? '로그인 중...' : claimLoading ? '계정 연동 중...' : niceLoading ? '본인인증 중...' : '로그인'}
        </Button>
        <div
          className={styles.hiddenTestEmailTrigger}
          onClick={handleSendTestEmail}
          aria-label={testEmailLoading ? '테스트 메일 전송 중' : '테스트 메일 보내기'}
        />
        {testEmailMessage && <p className={styles.testEmailMessage}>{testEmailMessage}</p>}
      </form>
      {showLinks && (
        <div className={styles.links}>
          <Link href='/find-user' className={styles.link}>
            아이디 찾기/비밀번호 찾기
          </Link>
          <span className={styles.separator} />
          <Link href='/signup' className={styles.link}>
            회원가입
          </Link>
        </div>
      )}

      <AlertModal
        isOpen={showChangePwModal}
        message='비밀번호 설정이 필요합니다. 비밀번호를 변경해주세요.'
        closeButtonText='확인'
        onClose={() => {
          setShowChangePwModal(false)
          router.push('/mypage/change-password')
        }}
      />
    </div>
  )
}
