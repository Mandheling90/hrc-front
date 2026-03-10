'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import styles from './TopButton.module.scss'

export const TopButton: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 200)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`${styles.topButton} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      type="button"
    >
      <ChevronUpIcon width={20} height={20} stroke="#636363" />
    </button>
  )
}
