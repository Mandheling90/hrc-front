'use client'

import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useHospital } from '@/hooks'
import styles from './Header.module.scss'

const navigationItems = [
  { href: '/referral', label: '진료의뢰' },
  { href: '#', label: '협력네트워크' },
  { href: '#', label: '공지/정보' },
  { href: '#', label: '진료협력센터 소개' }
]

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { hospital } = useHospital()

  // const pathname = usePathname()
  // const isLoginPage = pathname === '/login'
  // const isSignupPage = pathname === '/signup'
  // const isFindUserPage = pathname === '/find-user'
  // const isReferralPage = pathname === '/referral'
  const isAuthPage = true
  // 로그인 페이지와 진료의뢰 페이지는 동일한 헤더 스타일 적용
  const isFullHeader = isAuthPage

  return (
    <header id='header' className={`${styles.header} ${isFullHeader ? styles.loginPage : ''}`}>
      <div className='container'>
        <div className='flex align-center'>
          <div className={styles.logoSection}>
            <h1>
              <Link href='/' aria-label={`${hospital.name.full} 홈`}>
                {hospital.name.full}
              </Link>
            </h1>
          </div>
          <nav className={styles.gnb}>
            <ul className='flex'>
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.util}>
            {isAuthPage ? (
              <>
                <Link href='/login' className={styles.textLink}>
                  로그인
                </Link>
                <span className={styles.separator}>|</span>
                <Link href='/signup' className={styles.textLink}>
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link href='/login' className={styles.btnLogin} aria-label='로그인'>
                  <i className={`icon icon-user ${styles.icon}`}></i>
                </Link>
                <button
                  id='btnAllMenu'
                  className={styles.btnAllMenu}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  title='전체메뉴 열기'
                  aria-label='전체메뉴'
                >
                  <i className={`icon icon-menu ${styles.icon}`}></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
