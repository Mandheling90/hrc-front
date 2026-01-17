'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './FindPasswordForm.module.scss'

type TabType = 'findId' | 'findPassword'

export const FindPasswordForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('findId')
  const [phoneFormData, setPhoneFormData] = useState({
    name: '',
    phone: ''
  })
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    email: ''
  })
  const [passwordFormData, setPasswordFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: ''
  })

  const handlePhoneFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPhoneFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFindIdByPhone = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 휴대전화로 아이디 찾기 로직 구현
    console.log('Find ID by phone:', phoneFormData)
  }

  const handleFindIdByEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 이메일로 아이디 찾기 로직 구현
    console.log('Find ID by email:', emailFormData)
  }

  const handleFindPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 비밀번호 찾기 로직 구현
    console.log('Find password:', passwordFormData)
  }

  return (
    <div className={styles.findForm}>
      <h2 className={styles.title}>{activeTab === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</h2>

      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'findId' ? styles.active : ''}`}
            onClick={() => setActiveTab('findId')}
          >
            아이디 찾기
          </button>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'findPassword' ? styles.active : ''}`}
            onClick={() => setActiveTab('findPassword')}
          >
            비밀번호 찾기
          </button>
        </div>
        {activeTab === 'findId' && (
          <InfoBox
            messages={[
              '회원 가입 시와 동일하게 본인 인증 후 아이디를 찾아주세요.',
              '휴대전화 본인 인증이나 아이핀 인증으로 아이디를 찾을 수 있습니다.'
            ]}
          />
        )}

        <div className={styles.authSections}>
          {/* 휴대전화 인증 */}
          <div className={styles.authSection}>
            <h3 className={styles.authTitle}>
              <span className={styles.titleHighlight}>휴대전화</span> 인증
            </h3>
            <form onSubmit={handleFindIdByPhone} className={styles.authForm}>
              <div className={styles.inputField}>
                <InputLabel htmlFor='phone-name' required>
                  이름
                </InputLabel>
                <Input
                  type='text'
                  id='phone-name'
                  name='name'
                  placeholder='홍길동'
                  value={phoneFormData.name}
                  onChange={handlePhoneFormChange}
                  required
                  className={`${styles.input} ${styles.active}`}
                />
              </div>
              <div className={styles.inputField}>
                <InputLabel htmlFor='phone-number' required>
                  휴대전화 번호
                </InputLabel>
                <Input
                  type='tel'
                  id='phone-number'
                  name='phone'
                  placeholder="'-' 제외하고 입력"
                  value={phoneFormData.phone}
                  onChange={handlePhoneFormChange}
                  required
                  className={styles.input}
                />
              </div>
              <Button type='submit' variant='primary' size='medium' fullWidth className={styles.submitButton}>
                {activeTab === 'findId' ? '아이디 찾기' : '임시 비밀번호 발급'}
              </Button>
            </form>
          </div>

          {/* 이메일 인증 */}
          <div className={`${styles.authSection} ${styles.inactive}`}>
            <h3 className={styles.authTitle}>
              <span className={styles.titleHighlight}>이메일</span> 인증
            </h3>
            <form onSubmit={handleFindIdByEmail} className={styles.authForm}>
              <div className={styles.inputField}>
                <InputLabel htmlFor='email-name' required>
                  이름
                </InputLabel>
                <Input
                  type='text'
                  id='email-name'
                  name='name'
                  placeholder='홍길동'
                  value={emailFormData.name}
                  onChange={handleEmailFormChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputField}>
                <InputLabel htmlFor='email-address' required>
                  이메일
                </InputLabel>
                <Input
                  type='email'
                  id='email-address'
                  name='email'
                  placeholder='ex) a1b2c3@naver.com'
                  value={emailFormData.email}
                  onChange={handleEmailFormChange}
                  required
                  className={styles.input}
                />
              </div>
              <Button type='submit' variant='primary' size='medium' fullWidth className={styles.submitButton}>
                {activeTab === 'findId' ? '아이디 찾기' : '임시 비밀번호 발급'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
