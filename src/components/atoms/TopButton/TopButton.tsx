'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { ThemeToggle } from '@/components/atoms/ThemeToggle/ThemeToggle'
import styles from './TopButton.module.scss'

export const TopButton: React.FC = () => {
  const [visible, setVisible] = useState(true)

  const handleScroll = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`${styles.floatingButtons} ${visible ? styles.visible : ''}`}>
      <ThemeToggle />
      <button
        className={styles.topButton}
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
        type="button"
      >
        <ChevronUpIcon width={20} height={20} stroke="#636363" />
      </button>
    </div>
  )
}
