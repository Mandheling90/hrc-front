'use client'

import React from 'react'
import { ServiceTitleIcon } from '@/components/icons/ServiceTitleIcon'
import styles from './SectionTitle.module.scss'

export interface SectionTitleProps {
  /** 섹션 제목 텍스트 */
  title: string
  /** 추가 클래스명 */
  className?: string
  /** 아이콘 표시 여부 (기본값: true) */
  showIcon?: boolean
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = '', showIcon = true }) => {
  // title이 빈 문자열이면 렌더링하지 않음
  if (!title) {
    return null
  }

  return (
    <div className={`${styles.header} ${className}`}>
      {showIcon && <ServiceTitleIcon className={styles.titleIcon} />}
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
