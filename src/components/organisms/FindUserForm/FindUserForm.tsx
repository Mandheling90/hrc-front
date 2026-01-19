'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import styles from './FindUserForm.module.scss'

type TabType = 'findId' | 'findPassword'

export const FindUserForm: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const tabParam = searchParams.get('tab') as TabType | null
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === 'findPassword' ? 'findPassword' : 'findId')

  useEffect(() => {
    if (tabParam === 'findPassword') {
      setActiveTab('findPassword')
    } else {
      setActiveTab('findId')
    }
  }, [tabParam])

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    router.push(`${pathname}?tab=${tab}`)
  }
  const [phoneFormData, setPhoneFormData] = useState({
    name: '',
    phone: ''
  })
  const [emailFormData, setEmailFormData] = useState({
    name: '',
    email: ''
  })
  const [passwordPhoneFormData, setPasswordPhoneFormData] = useState({
    id: '',
    name: '',
    phone: ''
  })
  const [passwordEmailFormData, setPasswordEmailFormData] = useState({
    id: '',
    name: '',
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

  const handlePasswordPhoneFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordPhoneFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordEmailFormData(prev => ({
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

  const handleFindPasswordByPhone = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 휴대전화로 비밀번호 찾기 로직 구현
    console.log('Find password by phone:', passwordPhoneFormData)
  }

  const handleFindPasswordByEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 이메일로 비밀번호 찾기 로직 구현
    console.log('Find password by email:', passwordEmailFormData)
  }

  return (
    <div className={styles.findForm}>
      <h2 className={styles.title}>{activeTab === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</h2>

      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'findId' ? styles.active : ''}`}
            onClick={() => handleTabChange('findId')}
          >
            아이디 찾기
          </button>
          <button
            type='button'
            className={`${styles.tab} ${activeTab === 'findPassword' ? styles.active : ''}`}
            onClick={() => handleTabChange('findPassword')}
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
            {activeTab === 'findId' ? (
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
                  아이디 찾기
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFindPasswordByPhone} className={styles.authForm}>
                <div className={styles.inputField}>
                  <InputLabel htmlFor='password-phone-name' required>
                    이름
                  </InputLabel>
                  <Input
                    type='text'
                    id='password-phone-name'
                    name='name'
                    placeholder='홍길동'
                    value={passwordPhoneFormData.name}
                    onChange={handlePasswordPhoneFormChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputField}>
                  <InputLabel htmlFor='password-phone-number' required>
                    휴대전화 번호
                  </InputLabel>
                  <Input
                    type='tel'
                    id='password-phone-number'
                    name='phone'
                    placeholder="'-' 제외하고 입력"
                    value={passwordPhoneFormData.phone}
                    onChange={handlePasswordPhoneFormChange}
                    required
                    className={styles.input}
                  />
                </div>
                <Button type='submit' variant='primary' size='medium' fullWidth className={styles.submitButton}>
                  임시 비밀번호 발급
                </Button>
              </form>
            )}
          </div>

          {/* 이메일 인증 */}
          <div className={`${styles.authSection} ${styles.inactive}`}>
            <h3 className={styles.authTitle}>
              <span className={styles.titleHighlight}>이메일</span> 인증
            </h3>
            {activeTab === 'findId' ? (
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
                  아이디 찾기
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFindPasswordByEmail} className={styles.authForm}>
                <div className={styles.inputField}>
                  <InputLabel htmlFor='password-email-id' required>
                    아이디
                  </InputLabel>
                  <Input
                    type='text'
                    id='password-email-id'
                    name='id'
                    placeholder='아이디를 입력하세요'
                    value={passwordEmailFormData.id}
                    onChange={handlePasswordEmailFormChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputField}>
                  <InputLabel htmlFor='password-email-name' required>
                    이름
                  </InputLabel>
                  <Input
                    type='text'
                    id='password-email-name'
                    name='name'
                    placeholder='홍길동'
                    value={passwordEmailFormData.name}
                    onChange={handlePasswordEmailFormChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputField}>
                  <InputLabel htmlFor='password-email-address' required>
                    이메일
                  </InputLabel>
                  <Input
                    type='email'
                    id='password-email-address'
                    name='email'
                    placeholder='ex) a1b2c3@naver.com'
                    value={passwordEmailFormData.email}
                    onChange={handlePasswordEmailFormChange}
                    required
                    className={styles.input}
                  />
                </div>
                <Button type='submit' variant='primary' size='medium' fullWidth className={styles.submitButton}>
                  임시 비밀번호 발급
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
