'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './AlertModal.module.scss'

export interface AlertModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 팝업 메시지 */
  message: string
  /** 닫기 버튼 텍스트 (기본값: "닫기") */
  closeButtonText?: string
  /** 닫기 핸들러 */
  onClose: () => void
  /** 배경 클릭 시 닫기 여부 (기본값: false) */
  closeOnBackdropClick?: boolean
  /** 추가 클래스명 */
  className?: string
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  message,
  closeButtonText = '닫기',
  onClose,
  closeOnBackdropClick = false,
  className = ''
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

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${className}`}>
        <p className={styles.message}>{message}</p>
        <button type='button' className={styles.closeButton} onClick={onClose}>
          {closeButtonText}
        </button>
      </div>
    </div>,
    document.body
  )
}
