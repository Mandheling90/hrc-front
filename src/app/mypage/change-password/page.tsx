'use client'

import React, { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useChangePassword } from '@/hooks/useAuth'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import resetStyles from '@/components/organisms/ResetPasswordForm/ResetPasswordForm.module.scss'
import styles from './page.module.scss'

export default function ChangePasswordPage() {
  const router = useHospitalRouter()
  const { user, loginPassword, setLoginPassword } = useAuthContext()
  const { changePassword, loading } = useChangePassword()

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string; success: boolean }>({
    isOpen: false,
    message: '',
    success: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
    if (user?.userId && password.includes(user.userId)) {
      return '아이디와 동일한 문구를 사용할 수 없습니다.'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!loginPassword) {
      setErrorMessage('로그인 정보가 만료되었습니다. 다시 로그인해주세요.')
      return
    }

    if (!formData.newPassword) {
      setErrorMessage('새 비밀번호를 입력해주세요.')
      return
    }

    const validationError = validatePassword(formData.newPassword)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const result = await changePassword({
        oldPassword: loginPassword,
        newPassword: formData.newPassword
      })

      if (result?.success) {
        setLoginPassword(null)
        setAlertModal({ isOpen: true, message: '비밀번호가 성공적으로 변경되었습니다.', success: true })
      } else {
        setErrorMessage(result?.message || '비밀번호 변경에 실패했습니다.')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '비밀번호 변경 중 오류가 발생했습니다.'
      setErrorMessage(message)
    }
  }

  const handleAlertClose = () => {
    setAlertModal({ isOpen: false, message: '', success: false })
    if (alertModal.success) {
      router.push('/')
    }
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.changePasswordContainer}>
            <div className={resetStyles.resetPasswordForm}>
              <div className={resetStyles.headerSection}>
                <h2 className={resetStyles.title}>비밀번호 변경</h2>
                <p className={resetStyles.description}>
                  임시비밀번호로 로그인하셨습니다.<br />
                  새로운 비밀번호를 설정해주세요.
                </p>
              </div>
              <form onSubmit={handleSubmit} className={resetStyles.form}>
                <div className={resetStyles.inputGroup}>
                  <div className={resetStyles.passwordInputWrapper}>
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      id='newPassword'
                      name='newPassword'
                      placeholder='새 비밀번호를 입력해주세요.'
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={resetStyles.input}
                    />
                    <button
                      type='button'
                      className={resetStyles.passwordToggle}
                      onClick={() => setShowNewPassword(prev => !prev)}
                      aria-label={showNewPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                      <EyeIcon width={24} height={24} showPassword={showNewPassword} stroke='#636363' />
                    </button>
                  </div>
                  <div className={resetStyles.passwordRules}>
                    <p className={resetStyles.rule}>영문, 숫자, 특수문자 조합 8~12자리 사용 가능, 연속번호는 사용금지</p>
                    <p className={resetStyles.rule}>특수문자 사용 가능 범위: ~!@#$%^&*_-</p>
                    <p className={resetStyles.rule}>동일문자 연속 4개 사용금지</p>
                    <p className={resetStyles.rule}>아이디와 동일한 문구 사용금지</p>
                  </div>
                  <div className={resetStyles.passwordInputWrapper}>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder='새 비밀번호를 한번 더 입력해주세요.'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={resetStyles.input}
                    />
                    <button
                      type='button'
                      className={resetStyles.passwordToggle}
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                      <EyeIcon width={24} height={24} showPassword={showConfirmPassword} stroke='#636363' />
                    </button>
                  </div>
                </div>
                {errorMessage && <p className={resetStyles.errorText}>{errorMessage}</p>}
                <div className={resetStyles.buttonWrapper}>
                  <Button
                    type='submit'
                    variant='primary'
                    size='medium'
                    fullWidth
                    className={resetStyles.submitButton}
                    disabled={loading}
                  >
                    {loading ? '변경 중...' : '비밀번호 변경'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        onClose={handleAlertClose}
      />
    </div>
  )
}
