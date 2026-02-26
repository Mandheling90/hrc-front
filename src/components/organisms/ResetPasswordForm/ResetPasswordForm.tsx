'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMutation } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { RESET_PASSWORD_BY_VERIFICATION_MUTATION } from '@/graphql/verification/mutations'
import styles from './ResetPasswordForm.module.scss'

export const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useHospitalRouter()
  const userId = searchParams.get('userId') || ''
  const verificationToken = searchParams.get('verificationToken') || ''

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const [resetPasswordByVerification, { loading }] = useMutation<{
    resetPasswordByVerification: { message: string; success: boolean }
  }>(RESET_PASSWORD_BY_VERIFICATION_MUTATION)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errorMessage) setErrorMessage('')
  }

  const validatePassword = (password: string): string | null => {
    if (password.length < 8 || password.length > 12) {
      return '비밀번호는 8~12자리로 입력해주세요.'
    }
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[~!@#$%^&*_\-]/.test(password)
    if (!hasLetter || !hasNumber || !hasSpecial) {
      return '영문, 숫자, 특수문자를 모두 포함해주세요.'
    }
    if (/(.)\1{3,}/.test(password)) {
      return '동일문자를 연속 4개 이상 사용할 수 없습니다.'
    }
    if (userId && password.includes(userId)) {
      return '아이디와 동일한 문구를 사용할 수 없습니다.'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!userId || !verificationToken) {
      setErrorMessage('잘못된 접근입니다. 비밀번호 찾기를 다시 진행해주세요.')
      return
    }

    if (!formData.password) {
      setErrorMessage('비밀번호를 입력해주세요.')
      return
    }

    const validationError = validatePassword(formData.password)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const { data } = await resetPasswordByVerification({
        variables: {
          input: {
            userId,
            verificationToken,
            newPassword: formData.password,
            newPasswordConfirm: formData.confirmPassword
          }
        }
      })

      if (data?.resetPasswordByVerification?.success) {
        setIsSuccess(true)
      } else {
        setErrorMessage(data?.resetPasswordByVerification?.message || '비밀번호 재설정에 실패했습니다.')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '비밀번호 재설정 중 오류가 발생했습니다.'
      setErrorMessage(message)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev)
  }

  const handleGoLogin = () => {
    router.push('/login')
  }

  // 성공 화면
  if (isSuccess) {
    return (
      <div className={styles.resetPasswordForm}>
        <div className={styles.headerSection}>
          <h2 className={styles.title}>비밀번호 재설정 완료</h2>
          <p className={styles.description}>
            비밀번호가 성공적으로 변경되었습니다.<br />
            새로운 비밀번호로 로그인해주세요.
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
          <p className={styles.description}>
            잘못된 접근입니다. 비밀번호 찾기를 다시 진행해주세요.
          </p>
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

  return (
    <div className={styles.resetPasswordForm}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>비밀번호 재설정</h2>
        <p className={styles.description}>
          새로운 비밀번호를 입력해주세요.
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.passwordInputWrapper}>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='비밀번호를 입력해주세요.'
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
            <button
              type='button'
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              <EyeIcon width={24} height={24} showPassword={showPassword} stroke='#636363' />
            </button>
          </div>
          <div className={styles.passwordRules}>
            <p className={styles.rule}>영문, 숫자, 특수문자 조합 8~12자리 사용 가능, 연속번호는 사용금지</p>
            <p className={styles.rule}>특수문자 사용 가능 범위: ~!@#$%^&*_-</p>
            <p className={styles.rule}>동일문자 연속 4개 사용금지</p>
            <p className={styles.rule}>아이디와 동일한 문구 사용금지</p>
          </div>
          <div className={styles.passwordInputWrapper}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              placeholder='비밀번호를 한번 더 입력해주세요.'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
            />
            <button
              type='button'
              className={styles.passwordToggle}
              onClick={toggleConfirmPasswordVisibility}
              aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              <EyeIcon width={24} height={24} showPassword={showConfirmPassword} stroke='#636363' />
            </button>
          </div>
        </div>
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        <div className={styles.buttonWrapper}>
          <Button
            type='submit'
            variant='primary'
            size='medium'
            fullWidth
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </div>
      </form>
    </div>
  )
}
