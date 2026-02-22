'use client'

import React, { useState } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { EyeIcon } from '@/components/icons/EyeIcon'
import styles from './page.module.scss'

// 탈퇴 안내 사항
const withdrawNoticeItems = [
  '회원 탈퇴 시 고려대학교병원 진료협력센터(안암/구로/안산) 홈페이지에서 온라인 서비스를 이용하실 수 없습니다.',
  '회원 탈퇴 시 회원님의 회원정보가 모두 삭제되며 복구할 수 없습니다.',
  '탈퇴한 회원 ID와 동일한 ID로의 재가입은 불가합니다.'
]

// 더미 데이터 - 실제로는 로그인된 사용자 정보를 사용
const mockUserId = 'ID1234TEST'

const breadcrumbItems = [{ label: '마이페이지', href: '/mypage' }, { label: '회원탈퇴' }]

export default function WithdrawPage() {
  const router = useHospitalRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 회원탈퇴 API 호출
    console.log('회원탈퇴 요청:', { userId: mockUserId, password })
  }

  const handleCancel = () => {
    router.back()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>회원탈퇴</h1>

          <div className={styles.noticeSection}>
            <ul className={styles.noticeList}>
              {withdrawNoticeItems.map((item, index) => (
                <li key={index} className={styles.noticeItem}>
                  <span className={styles.bullet} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Input type='text' id='userId' name='userId' placeholder='아이디' value={mockUserId} disabled />
            </div>
            <div className={styles.inputGroup}>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='비밀번호'
                value={password}
                onChange={e => setPassword(e.target.value)}
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
            <div className={styles.buttonGroup}>
              <Button type='button' variant='outline' size='medium' onClick={handleCancel}>
                취소
              </Button>
              <Button type='submit' variant='primary' size='medium'>
                회원탈퇴
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
