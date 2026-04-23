'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle'
import styles from './TopButton.module.scss'

export const TopButton: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    setVisible(true)
    const progress = Math.min(1, Math.max(0, window.scrollY / 400))
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div className={`${styles.floatingButtons} ${visible ? styles.visible : ''}`}>
      <ThemeToggle />
      <div
        className={styles.switchBtnArea}
        style={{ height: `${110 - scrollProgress * 40}px` }}
      >
        <button
          className={`${styles.floatingBtn} ${styles.scrollBtn}`}
          style={{
            opacity: 1 - scrollProgress,
            transform: `scale(${1 - scrollProgress * 0.25})`,
            pointerEvents: scrollProgress >= 0.95 ? 'none' : 'auto'
          }}
          onClick={scrollToNext}
          aria-label="아래로 스크롤"
          type="button"
        >
          <span className={styles.scrollBtnLabel}>Scroll Down</span>
          <ChevronDownIcon width={24} height={24} fill="#ffffff" />
        </button>
        <button
          className={`${styles.floatingBtn} ${styles.topBtn}`}
          style={{
            opacity: scrollProgress,
            transform: `scale(${0.75 + scrollProgress * 0.25})`,
            pointerEvents: scrollProgress >= 0.95 ? 'auto' : 'none'
          }}
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
          type="button"
        >
          <ChevronUpIcon width={22} height={22} stroke="#ffffff" />
        </button>
      </div>
    </div>
  )
}
