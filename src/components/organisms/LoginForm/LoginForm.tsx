'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './LoginForm.module.scss'

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', formData)
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

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.title}>로그인</h2>
      <p className={styles.description}>
        <span className={styles.highlight}>진료협력센터</span> 홈페이지는 의료진 전용 홈페이지로 회원 서비스는 로그인 후
        이용하실 수 있습니다.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            type='text'
            id='id'
            name='id'
            placeholder='아이디'
            value={formData.id}
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
    </div>
  )
}
