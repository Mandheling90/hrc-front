'use client'

import React from 'react'
import {
  VerticalServiceCard,
  HorizontalServiceCard,
  StepBadgeCard,
  IconTitleCard,
  CardLayoutType
} from '@/components/molecules/ServiceCard'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import styles from './ServiceSection.module.scss'

/** 기존 호환성을 위한 ServiceItem 타입 */
export interface ServiceItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string | string[]
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  /** @deprecated 새 API에서는 layoutType을 사용하세요 */
  tabletSpan?: number
  /** @deprecated 새 API에서는 layoutType을 사용하세요 */
  mobileSpan?: number
  /** @deprecated 새 API에서는 layoutType을 사용하세요 */
  mobileTitleBelowIcon?: boolean
  /** 카드 레이아웃 타입 (새 API) */
  layoutType?: CardLayoutType
  /** 배지 텍스트 (step-badge 타입일 때) */
  badgeText?: string
  /** 모바일에서 정렬 방식 (기본값: 'left') */
  mobileAlign?: 'left' | 'center'
  /** 외부 링크 여부 (새창 열기) */
  external?: boolean
}

export interface ServiceSectionProps {
  title?: string
  services: ServiceItem[]
  className?: string
  /** 기본 카드 레이아웃 타입 (개별 카드에서 override 가능) */
  defaultLayoutType?: CardLayoutType
  /** 그리드 열 수 설정 */
  columns?: 2 | 3 | 4 | 'auto'
  /** 모바일에서 기본 정렬 방식 (개별 카드에서 override 가능) */
  mobileAlign?: 'left' | 'center'
  /** @deprecated 새 API에서는 defaultLayoutType='horizontal'을 사용하세요 */
  horizontalLayout?: boolean
  /** @deprecated 새 API에서는 defaultLayoutType='step-badge'를 사용하세요 */
  useStepBadge?: boolean
  /** @deprecated 이 prop은 더 이상 지원되지 않습니다 */
  tabletThreeTwoLayout?: boolean
}

/**
 * 서비스 섹션 컴포넌트
 * 레이아웃만 담당하고, 카드 렌더링은 타입에 따라 적절한 컴포넌트 사용
 */
export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  services,
  className = '',
  defaultLayoutType = 'vertical',
  columns = 'auto',
  mobileAlign = 'left',
  // Legacy props (deprecated)
  horizontalLayout = false,
  useStepBadge = false,
  tabletThreeTwoLayout = false
}) => {
  // Legacy props를 새 API로 변환
  const resolvedDefaultLayoutType: CardLayoutType = useStepBadge
    ? 'step-badge'
    : horizontalLayout
      ? 'horizontal'
      : defaultLayoutType

  const renderCard = (service: ServiceItem) => {
    const layoutType = service.layoutType || resolvedDefaultLayoutType

    const commonProps = {
      icon: service.icon,
      title: service.title,
      description: service.description,
      href: service.href,
      onClick: service.onClick,
      className: service.className,
      style: service.style
    }

    // mobileSpan에 따른 wrapper 클래스
    const mobileSpanClass =
      service.mobileSpan === 2 ? styles.mobileSpanTwo : service.mobileSpan === 1 ? styles.mobileSpanOne : ''

    switch (layoutType) {
      case 'horizontal':
        return (
          <div key={service.id} className={mobileSpanClass}>
            <HorizontalServiceCard {...commonProps} mobileAlign={service.mobileAlign || mobileAlign} />
          </div>
        )
      case 'step-badge': {
        // step-badge일 때 badgeText가 없으면 description을 배지로 사용 (legacy 호환)
        const badgeText = service.badgeText || (typeof service.description === 'string' ? service.description : '')
        return (
          <div key={service.id} className={mobileSpanClass}>
            <StepBadgeCard {...commonProps} badgeText={badgeText} />
          </div>
        )
      }
      case 'icon-title': {
        // 아이콘+제목 그룹 카드 (description은 배열이어야 함)
        const descArray = Array.isArray(service.description) ? service.description : [service.description]
        return (
          <div key={service.id} className={mobileSpanClass}>
            <IconTitleCard
              icon={service.icon}
              title={service.title}
              description={descArray}
              href={service.href}
              external={service.external}
              onClick={service.onClick}
              className={service.className}
            />
          </div>
        )
      }
      case 'vertical':
      default:
        return (
          <div key={service.id} className={mobileSpanClass}>
            <VerticalServiceCard
              {...commonProps}
              mobileSpan={service.mobileSpan}
              mobileAlign={service.mobileAlign || mobileAlign}
            />
          </div>
        )
    }
  }

  const isFiveItems = services.length === 5
  const gridClassName = `${styles.grid} ${columns !== 'auto' ? styles[`columns${columns}`] : ''} ${tabletThreeTwoLayout && isFiveItems ? styles.tabletThreeTwoLayout : ''}`

  return (
    <section className={`${styles.section} ${className}`}>
      {title && <SectionTitle title={title} />}
      <div className={gridClassName}>{services.map(renderCard)}</div>
    </section>
  )
}
