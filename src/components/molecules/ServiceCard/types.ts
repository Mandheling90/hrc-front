'use client'

import React from 'react'

/** 카드 레이아웃 타입 */
export type CardLayoutType = 'vertical' | 'horizontal' | 'step-badge' | 'icon-title'

/** 기본 카드 props (공통) */
export interface BaseCardProps {
  icon: React.ReactNode
  title: string
  description?: string | string[]
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

/** 세로형 카드 props (아이콘 아래 텍스트) */
export interface VerticalServiceCardProps extends BaseCardProps {
  /** 반응형 사이즈 */
  size?: 'default' | 'small'
  /** 모바일에서 차지할 칸 수 (1 또는 2, 기본값: 1) */
  mobileSpan?: number
}

/** 가로형 카드 props (아이콘 옆 텍스트) */
export interface HorizontalServiceCardProps extends BaseCardProps {
  /** 반응형 사이즈 */
  size?: 'default' | 'small' | 'compact'
}

/** 스텝 배지 카드 props */
export interface StepBadgeCardProps extends BaseCardProps {
  /** 배지 텍스트 (필수) */
  badgeText: string
}

/** ServiceSection에서 사용할 서비스 아이템 타입 */
export interface ServiceItemConfig extends BaseCardProps {
  id: string
  /** 카드 레이아웃 타입 */
  layoutType?: CardLayoutType
  /** 배지 텍스트 (step-badge 타입일 때) */
  badgeText?: string
  /** 모바일에서 차지할 칸 수 (1 또는 2, 기본값: 1) */
  mobileSpan?: number
}
