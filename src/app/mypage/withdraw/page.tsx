'use client'

import React, { useState } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useAuthContext, useWithdrawMember } from '@/hooks'
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
  '회원 탈퇴 시 회원님의 회원정보가 모두 삭제되며 복구할 수 없습니다.'
]

const breadcrumbItems = [{ label: '마이페이지', href: '/mypage' }, { label: '회원탈퇴' }]

export default function WithdrawPage() {
  const router = useHospitalRouter()
  const { user } = useAuthContext()
  const { withdrawMember, loading } = useWithdrawMember()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      alert('비밀번호를 입력해주세요.')
      return
    }

    if (!confirm('정말로 탈퇴하시겠습니까?\n탈퇴 후 복구할 수 없습니다.')) {
      return
    }

    try {
      const result = await withdrawMember(password)
      if (result?.success) {
        alert('회원 탈퇴가 완료되었습니다.')
        router.push('/')
      } else {
        alert(result?.message || '회원 탈퇴에 실패했습니다.')
      }
    } catch (err: any) {
      const message = err?.graphQLErrors?.[0]?.message || '회원 탈퇴 중 오류가 발생했습니다.'
      alert(message)
    }
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
              <Input type='text' id='userId' name='userId' placeholder='아이디' value={user?.userId ?? ''} disabled />
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
              <Button type='submit' variant='primary' size='medium' disabled={loading}>
                {loading ? '처리중...' : '회원탈퇴'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
