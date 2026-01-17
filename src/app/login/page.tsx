'use client';

import { Footer, Header } from '@/components/organisms';
import { LoginForm } from '@/components/organisms/LoginForm';
import styles from './page.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.loginContainer}>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
