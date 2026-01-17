'use client'

import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { FindPasswordForm } from '@/components/organisms/FindPasswordForm/FindPasswordForm'
import styles from './page.module.scss'

export default function FindPasswordPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.findPasswordContainer}>
            <FindPasswordForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
