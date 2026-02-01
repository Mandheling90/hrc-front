'use client'

import React, { useEffect } from 'react'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import styles from './PathologyResultModal.module.scss'

export interface PathologyResultModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 검사명 (예: 자가면역) */
  examName: string
  /** 판독결과 내용 */
  result: string
  /** 배경 클릭 시 닫기 여부 (기본값: true) */
  closeOnBackdropClick?: boolean
}

export const PathologyResultModal: React.FC<PathologyResultModalProps> = ({
  isOpen,
  onClose,
  examName,
  result,
  closeOnBackdropClick = true
}) => {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // body 스크롤 방지
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

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.badge}>병리검사</span>
            <h2 className={styles.title}>{examName}</h2>
          </div>
          <button type='button' className={styles.closeButton} onClick={onClose} aria-label='닫기'>
            <CloseIcon />
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className={styles.content}>
          {/* 판독결과 섹션 */}
          <div className={styles.resultSection}>
            <SectionTitle title='판독결과' noMargin />
            <div className={styles.resultContent}>
              <p>{result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
