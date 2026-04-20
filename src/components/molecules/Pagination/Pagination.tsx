'use client'

import React from 'react'
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import styles from './Pagination.module.scss'

export interface PaginationProps {
  /** 현재 페이지 */
  currentPage: number
  /** 전체 페이지 수 */
  totalPages: number
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void
  /** 표시할 최대 페이지 번호 수 (기본값: 5) */
  maxVisiblePages?: number
  /** 페이지 변경 시 window를 상단으로 스크롤할지 여부 (기본값: true) */
  scrollToTopOnChange?: boolean
  /** className */
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  scrollToTopOnChange = true,
  className = ''
}) => {
  const effectiveMaxVisible = maxVisiblePages

  // 페이지 번호 배열 생성 (블록 단위)
  const getPageNumbers = () => {
    const pages: number[] = []
    const blockIndex = Math.floor((currentPage - 1) / effectiveMaxVisible)
    const startPage = blockIndex * effectiveMaxVisible + 1
    const endPage = Math.min(startPage + effectiveMaxVisible - 1, totalPages)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const changePage = (page: number) => {
    onPageChange(page)
    if (scrollToTopOnChange) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) changePage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) changePage(currentPage + 1)
  }

  const handleFirst = () => {
    if (currentPage > 1) changePage(1)
  }

  const handleLast = () => {
    if (currentPage < totalPages) changePage(totalPages)
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={`${styles.pagination} ${className}`}>
      {/* 첫 페이지로 이동 */}
      <button
        type='button'
        className={styles.navButton}
        onClick={handleFirst}
        disabled={currentPage === 1}
        aria-label='첫 페이지로 이동'
      >
        <div className={styles.doubleArrowContainer}>
          <ChevronLeftIcon width={24} height={24} stroke='var(--gray-9)' />
          <ChevronLeftIcon width={24} height={24} stroke='var(--gray-9)' className={styles.doubleArrow} />
        </div>
      </button>

      {/* 이전 페이지 */}
      <button
        type='button'
        className={styles.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label='이전 페이지'
      >
        <ChevronLeftIcon width={24} height={24} stroke='var(--gray-9)' />
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map(pageNum => {
        const isActive = pageNum === currentPage

        return (
          <button
            key={pageNum}
            type='button'
            className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
            onClick={() => changePage(pageNum)}
            aria-label={`${pageNum}페이지로 이동`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNum}
          </button>
        )
      })}

      {/* 다음 페이지 */}
      <button
        type='button'
        className={styles.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label='다음 페이지'
      >
        <ChevronRightIcon width={24} height={24} stroke='var(--gray-9)' />
      </button>

      {/* 마지막 페이지로 이동 */}
      <button
        type='button'
        className={styles.navButton}
        onClick={handleLast}
        disabled={currentPage === totalPages}
        aria-label='마지막 페이지로 이동'
      >
        <div className={styles.doubleArrowContainer}>
          <ChevronRightIcon width={24} height={24} stroke='var(--gray-9)' />
          <ChevronRightIcon width={24} height={24} stroke='var(--gray-9)' className={styles.doubleArrow} />
        </div>
      </button>
    </div>
  )
}
