'use client'

import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { LoginForm } from '@/components/organisms/LoginForm/LoginForm'
import styles from './page.module.scss'

export default function ConsultantLoginPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.loginContainer}>
            <LoginForm
              usernameLabel='사번'
              usernameName='employeeNumber'
              description='e-Consult 조회 서비스는 로그인 후 이용하실 수 있습니다.'
              highlightText='e-Consult'
              showLinks={false}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
