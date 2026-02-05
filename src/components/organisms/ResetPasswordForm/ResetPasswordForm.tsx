'use client'

import React, { useState } from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import styles from './ResetPasswordForm.module.scss'

export const ResetPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 비밀번호 재설정 로직 구현
    console.log('Reset password:', formData)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev)
  }

  return (
    <div className={styles.resetPasswordForm}>
      <div className={styles.headerSection}>
        <h2 className={styles.title}>비밀번호 재설정</h2>
        <p className={styles.description}>
          회원님의 정보를 안전하게 보호하기 위해 임시비밀번호를 실제 사용하시는 비밀번호로 변경해주시기 바랍니다.
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='비밀번호를 입력해주세요.'
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
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
        <div className={styles.buttonWrapper}>
          <Button type='submit' variant='primary' size='medium' fullWidth className={styles.submitButton}>
            비밀번호 변경
          </Button>
        </div>
      </form>
    </div>
  )
}
