'use client'

// import { Header } from '@/components/organisms/Header/Header'
// import { Footer } from '@/components/organisms/Footer/Footer'
import { SignupForm } from '@/components/organisms/SignupForm/SignupForm'
import styles from './page.module.scss'

export default function SignupPage() {
  return (
    <div className={styles.wrap}>
      {/* <Header /> */}
      <main className={styles.main}>
        <div className='container'>
          <div className={styles.signupContainer}>
            <SignupForm />
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
