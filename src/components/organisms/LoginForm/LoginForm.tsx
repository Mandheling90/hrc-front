'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import Link from 'next/link'
import React, { useState } from 'react'
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
  /** 로그인 제출 핸들러 */
  onSubmit?: (formData: { [key: string]: string }) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  usernameLabel = '아이디',
  usernameName = 'id',
  description,
  highlightText,
  showLinks = true,
  onSubmit
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    [usernameName]: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      // 기본 동작: 콘솔에 로그 출력
      console.log('Login attempt:', formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
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
            <EyeIcon width={20} height={20} showPassword={showPassword} />
          </button>
        </div>
        <Button type='submit' variant='primary' size='medium' fullWidth>
          로그인
        </Button>
      </form>
      {showLinks && (
        <div className={styles.links}>
          <Link href='/find-user?tab=findId' className={styles.link}>
            아이디 찾기
          </Link>
          <span className={styles.separator}>|</span>
          <Link href='/find-user?tab=findPassword' className={styles.link}>
            비밀번호 찾기
          </Link>
          <span className={styles.separator}>|</span>
          <Link href='/signup' className={styles.link}>
            회원가입
          </Link>
        </div>
      )}
    </div>
  )
}
