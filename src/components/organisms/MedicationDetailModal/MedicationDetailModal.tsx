'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import styles from './MedicationDetailModal.module.scss'

export interface MedicationDetailData {
  /** 약품명 (영문) */
  drugName: string
  /** 한글명 */
  koreanName: string
  /** 성분 */
  ingredient: string
  /** 종류 */
  type: string
  /** 단위 */
  unit: string
  /** 제조사 */
  manufacturer: string
  /** 상세정보 */
  detail: string
}

export interface MedicationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  data: MedicationDetailData
}

interface InfoCellProps {
  label: string
  value: string
}

const InfoCell: React.FC<InfoCellProps> = ({ label, value }) => (
  <div className={styles.infoCell}>
    <span className={styles.infoCellLabel}>{label}</span>
    <div className={styles.infoCellDivider} />
    <span className={styles.infoCellValue}>{value}</span>
  </div>
)

export const MedicationDetailModal: React.FC<MedicationDetailModalProps> = ({ isOpen, onClose, data }) => {
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
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>약 처방 내역</span>
            <h2 className={styles.title}>약품 정보</h2>
          </div>
          <button type='button' className={styles.closeBtn} onClick={onClose} aria-label='닫기'>
            <CloseIcon width={24} height={24} />
          </button>
        </div>

        {/* 본문 */}
        <div className={styles.body}>
          {/* 약품 정보 섹션 */}
          <div className={styles.drugSection}>
            <SectionTitle title={data.drugName} size='small' noMargin />
            <div className={styles.infoGrid}>
              <div className={styles.infoGridRow}>
                <InfoCell label='약품명' value={data.drugName} />
                <InfoCell label='한글명' value={data.koreanName} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoCell label='성분' value={data.ingredient} />
                <InfoCell label='종류' value={data.type} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoCell label='단위' value={data.unit} />
                <InfoCell label='제조사' value={data.manufacturer} />
              </div>
            </div>
          </div>

          {/* 상세정보 */}
          <div className={styles.detailSection}>
            <SectionTitle title='상세정보' size='small' noMargin />
            <div className={styles.detailContent}>
              <p className={styles.detailText}>{data.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
