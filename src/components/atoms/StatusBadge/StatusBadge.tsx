'use client'

import React from 'react'
import styles from './StatusBadge.module.scss'

export type StatusBadgeVariant = 'waiting' | 'expired' | 'completed'

export interface StatusBadgeProps {
  /** 뱃지 텍스트 */
  children: React.ReactNode
  /** 뱃지 스타일 변형 */
  variant: StatusBadgeVariant
  /** 추가 클래스명 */
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ children, variant, className = '' }) => {
  return <span className={`${styles.badge} ${styles[variant]} ${className}`}>{children}</span>
}
