'use client'

import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useHospital } from '@/contexts/HospitalContext'
import { useMutation } from '@apollo/client/react'
import { CONSULTANT_LOGIN_MUTATION } from '@/graphql/econsult/mutations'
import { useState } from 'react'
import styles from './page.module.scss'

const DOCTOR_ACCESS_TOKEN_KEY = 'doctorAccessToken'
const ECONSULT_CONSULTANT_KEY = 'econsult_consultant'

interface ConsultantLoginData {
  consultantLogin: {
    accessToken: string
    consultant: {
      id: string
      doctorId: string | null
      name: string
      hospitalCode: string
      departmentCode: string | null
      departmentName: string | null
    }
    cccUser: {
      userId: string
      userNm: string
      dprtNm: string
      hsptNm: string
    }
  }
}

export default function ConsultantLoginPage() {
  const router = useHospitalRouter()
  const { hospitalId } = useHospital()
  const [doctorId, setDoctorId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [consultantLogin, { loading }] = useMutation<ConsultantLoginData>(CONSULTANT_LOGIN_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const hospitalCode = hospitalId.toUpperCase()
      const { data } = await consultantLogin({
        variables: {
          input: {
            hospitalCode,
            loginId: doctorId.trim(),
            password
          }
        }
      })

      const result = data?.consultantLogin
      if (result) {
        localStorage.setItem(DOCTOR_ACCESS_TOKEN_KEY, result.accessToken)
        localStorage.setItem(ECONSULT_CONSULTANT_KEY, JSON.stringify(result.consultant))
        router.push('/network/e-consult/list')
      }
    } catch {
      setErrorMessage('사번 또는 비밀번호가 올바르지 않습니다.')
    }
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
                <Button
                  type='submit'
                  variant='primary'
                  size='medium'
                  fullWidth
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? '로그인 중...' : '로그인'}
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
