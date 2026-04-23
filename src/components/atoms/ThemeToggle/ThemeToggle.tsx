'use client'

import React, { useEffect, useState } from 'react'
import { SunCloudIcon } from '@/components/icons/SunCloudIcon'
import { MoonCloudIcon } from '@/components/icons/MoonCloudIcon'
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
      type='button'
    >
      <span className={styles.themeToggleInner}>
        {isDark ? <MoonCloudIcon width={38} height={33} /> : <SunCloudIcon width={40} height={36} />}
      </span>
    </button>
  )
}
