'use client'

import React from 'react'
import styles from './SectionHeader.module.scss'

export interface SectionHeaderProps {
  /** 섹션 제목 */
  title: string
  /** 섹션 부제목 (선택적) */
  subtitle?: string
  /** 추가 클래스명 */
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
