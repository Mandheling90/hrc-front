'use client'

import { Suspense } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm/ResetPasswordForm'
import styles from './page.module.scss'

export default function ResetPasswordPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.resetPasswordContainer}>
            <Suspense fallback={<div>로딩 중...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
