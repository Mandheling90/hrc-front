'use client'

import React from 'react'
import styles from './RouteChip.module.scss'

export type RouteChipVariant = 'blue' | 'deepblue' | 'green' | 'red' | 'yellow'
export type RouteChipSize = 'small' | 'large'

export interface RouteChipProps {
  /** 칩에 표시할 텍스트 (버스/지하철 노선 번호 등) */
  children: React.ReactNode
  /** 칩 색상 변형 */
  variant: RouteChipVariant
  /** 칩 크기 (small: 버스용, large: 인천공항용) */
  size?: RouteChipSize
  /** 추가 클래스명 */
  className?: string
}

export const RouteChip: React.FC<RouteChipProps> = ({ children, variant, size = 'small', className = '' }) => {
  return <span className={`${styles.chip} ${styles[size]} ${styles[variant]} ${className}`}>{children}</span>
}
