'use client'

import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { FindUserForm } from '@/components/organisms/FindUserForm/FindUserForm'
import styles from './page.module.scss'

export default function FindUserPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.findUserContainer}>
            <FindUserForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
