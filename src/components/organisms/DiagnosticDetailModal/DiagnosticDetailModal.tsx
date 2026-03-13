'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './DiagnosticDetailModal.module.scss'

// 검사 결과 항목 타입
export interface DiagnosticResultItem {
  id: number
  testName: string
  result: string | number
  min: number | string
  max: number | string
  isLow?: boolean
  isHigh?: boolean
  remark?: string
}

export interface DiagnosticDetailModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 검사명 (예: 미생물 영역) */
  examName: string
  /** 검사 결과 데이터 */
  results: DiagnosticResultItem[]
  /** 비고 내용 (레거시 - 항목별 remark 없을 때 폴백) */
  remarks?: string
  /** 배경 클릭 시 닫기 여부 (기본값: true) */
  closeOnBackdropClick?: boolean
  /** 데이터 로딩 중 */
  loading?: boolean
}

export const DiagnosticDetailModal: React.FC<DiagnosticDetailModalProps> = ({
  isOpen,
  onClose,
  examName,
  results,
  remarks,
  closeOnBackdropClick = true,
  loading = false
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

  // 결과값이 범위를 벗어났는지 확인
  const getResultStatus = (item: DiagnosticResultItem) => {
    if (item.isLow) return 'low'
    if (item.isHigh) return 'high'

    const result = typeof item.result === 'string' ? parseFloat(item.result) : item.result
    const min = typeof item.min === 'string' ? parseFloat(item.min) : item.min
    const max = typeof item.max === 'string' ? parseFloat(item.max) : item.max

    if (isNaN(result) || isNaN(min) || isNaN(max)) return 'normal'
    if (result < min) return 'low'
    if (result > max) return 'high'
    return 'normal'
  }

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.badge}>진단검사</span>
            <h2 className={styles.title}>상세 내역</h2>
          </div>
          <button type='button' className={styles.closeButton} onClick={onClose} aria-label='닫기'>
            <CloseIcon />
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className={styles.content}>
          {loading ? (
            <Skeleton width='100%' height={36} variant='rounded' count={4} gap={8} />
          ) : (
          <>
          {/* 검사명 섹션 */}
          <div className={styles.examSection}>
            <div className={styles.examHeader}>
              <SectionTitle title={examName} noMargin />
              <div className={styles.legend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendBoxMin}></span>
                  <span className={styles.legendText}>Min 이하</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendBoxMax}></span>
                  <span className={styles.legendText}>Max 이상</span>
                </div>
              </div>
            </div>

            <div className={styles.tableContainer}>
              {/* 데스크톱: 결과 테이블 */}
              <div className={styles.resultTable}>
                {/* 테이블 헤더 */}
                <div className={styles.tableHeader}>
                  <div className={`${styles.tableCell} ${styles.cellName}`}>검사명</div>
                  <div className={styles.divider}></div>
                  <div className={`${styles.tableCell} ${styles.cellResult}`}>결과치</div>
                  <div className={styles.divider}></div>
                  <div className={`${styles.tableCell} ${styles.cellMin}`}>Min</div>
                  <div className={styles.divider}></div>
                  <div className={`${styles.tableCell} ${styles.cellMax}`}>Max</div>
                  <div className={styles.divider}></div>
                  <div className={`${styles.tableCell} ${styles.cellRemark}`}>비고</div>
                </div>

                {/* 테이블 바디 */}
                {results.map(item => {
                  const status = getResultStatus(item)
                  return (
                    <div key={item.id} className={styles.tableRow}>
                      <div className={`${styles.tableCell} ${styles.cellName}`}>{item.testName}</div>
                      <div className={styles.divider}></div>
                      <div className={`${styles.tableCell} ${styles.cellResult}`}>
                        <span
                          className={`${styles.resultValue} ${status === 'low' ? styles.low : ''} ${status === 'high' ? styles.high : ''}`}
                        >
                          {item.result}
                        </span>
                      </div>
                      <div className={styles.divider}></div>
                      <div className={`${styles.tableCell} ${styles.cellMin}`}>{item.min}</div>
                      <div className={styles.divider}></div>
                      <div className={`${styles.tableCell} ${styles.cellMax}`}>{item.max}</div>
                      <div className={styles.divider}></div>
                      <div className={`${styles.tableCell} ${styles.cellRemark}`}>{item.remark || '-'}</div>
                    </div>
                  )
                })}
              </div>

              {/* 태블릿/모바일: 카드 형태 */}
              <div className={styles.mobileCards}>
                {results.map(item => {
                  const status = getResultStatus(item)
                  return (
                    <div key={item.id} className={styles.mobileCard}>
                      <div className={styles.mobileCardContent}>
                        <div className={styles.mobileCardHeader}>
                          <span className={styles.mobileCardLabel}>검사명</span>
                          <span className={styles.mobileCardValue}>{item.testName}</span>
                        </div>
                        <div className={styles.mobileCardBody}>
                          <div
                            className={`${styles.mobileCardRow} ${styles.resultRow} ${status === 'low' ? styles.low : ''} ${status === 'high' ? styles.high : ''}`}
                          >
                            <span className={styles.mobileCardLabel}>결과치</span>
                            <span
                              className={`${styles.mobileCardResultValue} ${status === 'low' ? styles.low : ''} ${status === 'high' ? styles.high : ''}`}
                            >
                              {item.result}
                            </span>
                          </div>
                          <div className={styles.mobileCardInfo}>
                            <div className={styles.mobileCardRow}>
                              <span className={styles.mobileCardLabel}>Min</span>
                              <span className={styles.mobileCardValue}>{item.min}</span>
                            </div>
                            <div className={styles.mobileCardRow}>
                              <span className={styles.mobileCardLabel}>Max</span>
                              <span className={styles.mobileCardValue}>{item.max}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {item.remark && (
                        <div className={styles.mobileCardRemark}>
                          <span className={styles.mobileCardLabel}>비고</span>
                          <span className={styles.mobileCardRemarkText}>{item.remark}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
