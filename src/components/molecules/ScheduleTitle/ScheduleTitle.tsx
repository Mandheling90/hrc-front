'use client'

import React from 'react'
import styles from './ScheduleTitle.module.scss'

export interface ScheduleTitleProps {
  /** 제목 텍스트 */
  title: string
  /** 추가 클래스명 */
  className?: string
}

export const ScheduleTitle: React.FC<ScheduleTitleProps> = ({ title, className = '' }) => {
  if (!title) {
    return null
  }

  return (
    <div className={`${styles.scheduleTitle} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
