'use client'

import React from 'react'
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import styles from './WeekSelector.module.scss'

export interface WeekSelectorProps {
  startDate: Date
  endDate: Date
  onPreviousWeek: () => void
  onNextWeek: () => void
  className?: string
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  startDate,
  endDate,
  onPreviousWeek,
  onNextWeek,
  className = ''
}) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  return (
    <div className={`${styles.weekSelector} ${className}`}>
      <button type='button' className={styles.navButton} onClick={onPreviousWeek} aria-label='이전 주'>
        <ChevronLeftIcon width={20} height={20} stroke='var(--gray-12)' />
      </button>
      <div className={styles.dateRange}>
        <span className={styles.dateText}>
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </span>
      </div>
      <button type='button' className={styles.navButton} onClick={onNextWeek} aria-label='다음 주'>
        <ChevronRightIcon width={20} height={20} stroke='var(--gray-12)' />
      </button>
    </div>
  )
}
