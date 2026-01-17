'use client'

import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { LoginForm } from '@/components/organisms/LoginForm/LoginForm'
import styles from './page.module.scss'

export default function LoginPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.loginContainer}>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
