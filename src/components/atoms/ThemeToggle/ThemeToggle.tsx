'use client'

import React, { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.scss'

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    setIsDark(currentTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      className={`${styles.themeToggle} ${isDark ? styles.dark : ''}`}
      onClick={toggleTheme}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      type="button"
    >
      {/* 해 아이콘 (위) */}
      <span className={`${styles.icon} ${styles.sunIcon}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1.5V2.5M8 13.5V14.5M1.5 8H2.5M13.5 8H14.5M3.17 3.17L3.88 3.88M12.12 12.12L12.83 12.83M12.83 3.17L12.12 3.88M3.88 12.12L3.17 12.83M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {/* 슬라이드 썸 */}
      <span className={styles.thumb} />
      {/* 달 아이콘 (아래) */}
      <span className={`${styles.icon} ${styles.moonIcon}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 7.47A6.5 6.5 0 1 1 6.53 1 5 5 0 0 0 13 7.47Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  )
}
