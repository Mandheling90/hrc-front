'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useHospital, useActivePopups } from '@/hooks'
import type { ActivePopup } from '@/hooks/useActivePopups'
import styles from './PopupZone.module.scss'

const STORAGE_KEY = 'popup-zone-hidden-date'

// 오늘 하루 보지않기 체크 여부
function isHiddenToday(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return false
  const storedDate = new Date(stored).toDateString()
  const today = new Date().toDateString()
  return storedDate === today
}

function setHiddenToday() {
  localStorage.setItem(STORAGE_KEY, new Date().toISOString())
}

// 반응형 cardsPerPage 훅
function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(3)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w <= 768) setCardsPerPage(1)
      else if (w <= 1429) setCardsPerPage(2)
      else setCardsPerPage(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return cardsPerPage
}

export const PopupZone: React.FC = () => {
  const { hospital } = useHospital()
  const { popups, loading } = useActivePopups()
  const [isOpen, setIsOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [hideToday, setHideToday] = useState(false)
  const cardsPerPage = useCardsPerPage()

  const showArrows = popups.length > cardsPerPage
  const maxIndex = Math.max(0, popups.length - cardsPerPage)

  // cardsPerPage 변경 시 인덱스 보정
  useEffect(() => {
    setStartIndex(prev => Math.min(prev, maxIndex))
  }, [maxIndex])

  // 팝업이 로드되면 표시 (오늘 하루 보지않기가 아닌 경우)
  useEffect(() => {
    if (!loading && popups.length > 0 && !isHiddenToday()) {
      setIsOpen(true)
    }
  }, [loading, popups.length])

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (hideToday) setHiddenToday()
    setIsOpen(false)
  }, [hideToday])

  const handlePopupClick = useCallback((popup: ActivePopup) => {
    if (!popup.linkUrl) return
    const url = /^https?:\/\//.test(popup.linkUrl) ? popup.linkUrl : `https://${popup.linkUrl}`
    if (popup.targetBlank) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = url
    }
  }, [])

  const handlePrev = useCallback(() => {
    setStartIndex(prev => (prev > 0 ? prev - 1 : maxIndex))
  }, [maxIndex])

  const handleNext = useCallback(() => {
    setStartIndex(prev => (prev < maxIndex ? prev + 1 : 0))
  }, [maxIndex])

  const visiblePopups = showArrows
    ? popups.slice(startIndex, startIndex + cardsPerPage)
    : popups

  // 팝업 개수에 따른 카드 정렬 클래스
  const cardsClassName = [
    styles.cards,
    !showArrows && popups.length === 1 && styles.cardsSingle,
    !showArrows && popups.length === 2 && styles.cardsPair,
  ]
    .filter(Boolean)
    .join(' ')

  if (!isOpen || popups.length === 0) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {/* 상단 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>POP-UP ZONE</h2>
          <div className={styles.hospitalLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hospital.logo.footer} alt={hospital.name.full} className={styles.hospitalLogoImg} />
          </div>
        </div>

        {/* 팝업 카드 캐러셀 */}
        <div className={styles.carousel}>
          {showArrows && (
            <button type='button' className={styles.navBtn} onClick={handlePrev} aria-label='이전'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M14 4L6 12L14 20' stroke='#333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          )}

          <div className={cardsClassName}>
            {visiblePopups.map(popup => (
              <div
                key={popup.id}
                className={styles.card}
                onClick={() => handlePopupClick(popup)}
                style={{ cursor: popup.linkUrl ? 'pointer' : 'default' }}
              >
                {popup.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={popup.imageUrl} alt={popup.altText || '팝업 이미지'} className={styles.cardImg} />
                ) : (
                  <div className={styles.cardPlaceholder} />
                )}
              </div>
            ))}
          </div>

          {showArrows && (
            <button type='button' className={styles.navBtn} onClick={handleNext} aria-label='다음'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M10 4L18 12L10 20' stroke='#333' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          )}
        </div>

        {/* 하단 정보 */}
        <div className={styles.footer}>
          <span className={styles.count}>팝업 총 · {popups.length}개</span>
          <div className={styles.actions}>
            <label className={styles.checkbox}>
              <input type='checkbox' checked={hideToday} onChange={e => setHideToday(e.target.checked)} />
              <span className={styles.checkboxBox} />
              <span className={styles.checkboxLabel}>오늘 하루 보지않기</span>
            </label>
            <button type='button' className={styles.closeBtn} onClick={handleClose} aria-label='닫기'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M18 6L6 18M6 6L18 18'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
