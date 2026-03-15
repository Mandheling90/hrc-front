'use client'

import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useState } from 'react'
import styles from './page.module.scss'

const ECONSULT_DOCTOR_ID_KEY = 'econsult_doctor_id'

export default function ConsultantLoginPage() {
  const router = useHospitalRouter()
  const [doctorId, setDoctorId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!doctorId.trim()) {
      setErrorMessage('사번을 입력해주세요.')
      return
    }
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.')
      return
    }

    // 임시: 사번만 localStorage에 저장 (일반 로그인과 분리)
    localStorage.setItem(ECONSULT_DOCTOR_ID_KEY, doctorId.trim())
    router.push('/network/e-consult/list')
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
              <h2 className={styles.title}>로그인</h2>
              <p className={styles.description}>
                <span className={styles.highlight}>e-Consult</span> 조회 서비스는 로그인 후 이용하실 수 있습니다.
              </p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <Input
                    type='text'
                    id='doctorId'
                    name='doctorId'
                    placeholder='사번'
                    value={doctorId}
                    onChange={e => setDoctorId(e.target.value)}
                    required
                  />
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
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    <EyeIcon width={24} height={24} showPassword={showPassword} />
                  </button>
                </div>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <Button type='submit' variant='primary' size='medium' fullWidth className={styles.loginButton}>
                  로그인
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
