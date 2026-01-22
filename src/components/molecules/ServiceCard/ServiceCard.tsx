'use client'

import React from 'react'
import { VerticalServiceCard } from './VerticalServiceCard'
import { HorizontalServiceCard } from './HorizontalServiceCard'
import { StepBadgeCard } from './StepBadgeCard'

/**
 * @deprecated 새로운 코드에서는 VerticalServiceCard, HorizontalServiceCard, StepBadgeCard를 직접 사용하세요.
 * 이 컴포넌트는 기존 호환성을 위해 유지됩니다.
 */
export interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string | string[]
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  /** @deprecated mobileVertical 대신 VerticalServiceCard를 사용하세요 */
  mobileVertical?: boolean
  /** @deprecated mobileTitleBelowIcon 대신 적절한 카드 컴포넌트를 사용하세요 */
  mobileTitleBelowIcon?: boolean
  /** @deprecated mobileSpan은 ServiceSection에서 레이아웃으로 처리하세요 */
  mobileSpan?: number
  /** @deprecated horizontalLayout 대신 HorizontalServiceCard를 사용하세요 */
  horizontalLayout?: boolean
  /** @deprecated stepBadge 대신 StepBadgeCard를 사용하세요 */
  stepBadge?: string | string[]
}

/**
 * @deprecated 새로운 코드에서는 VerticalServiceCard, HorizontalServiceCard, StepBadgeCard를 직접 사용하세요.
 * 이 컴포넌트는 기존 호환성을 위해 유지됩니다.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  className = '',
  style,
  mobileVertical = false,
  horizontalLayout = false,
  stepBadge
}) => {
  const commonProps = {
    icon,
    title,
    description,
    href,
    onClick,
    className,
    style
  }

  // stepBadge가 있으면 StepBadgeCard 사용
  if (stepBadge) {
    const badgeText = Array.isArray(stepBadge) ? stepBadge.join(' ') : stepBadge
    return <StepBadgeCard {...commonProps} badgeText={badgeText} />
  }

  // horizontalLayout이면 HorizontalServiceCard 사용
  if (horizontalLayout) {
    return <HorizontalServiceCard {...commonProps} />
  }

  // mobileVertical이거나 기본값은 VerticalServiceCard 사용
  return <VerticalServiceCard {...commonProps} size={mobileVertical ? 'small' : 'default'} />
}
