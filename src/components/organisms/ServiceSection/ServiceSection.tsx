'use client'

import React from 'react'
import { ServiceCard, ServiceCardProps } from '@/components/molecules/ServiceCard/ServiceCard'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import styles from './ServiceSection.module.scss'

export interface ServiceItem extends Omit<ServiceCardProps, 'className'> {
  id: string
  tabletSpan?: number // 태블릿에서 차지할 칸 수 (기본값: 1)
  mobileSpan?: number // 모바일에서 차지할 칸 수 (기본값: 1, 2로 설정 시 2열로 표시)
  mobileTitleBelowIcon?: boolean // 모바일에서 title을 아이콘 아래에 배치
}

export interface ServiceSectionProps {
  title: string
  services: ServiceItem[]
  className?: string
  /** 태블릿에서 1줄로 유지할지 여부 (기본값: false, 2줄로 표시) */
  keepSingleRowOnTablet?: boolean
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  services,
  className = '',
  keepSingleRowOnTablet = false
}) => {
  const isThreeItems = services.length === 3
  // 모바일에서 2열로 표시할지 여부 (하나라도 mobileSpan이 명시적으로 설정되어 있으면 2열 그리드)
  const hasMobileTwoColumns = services.some(service => service.mobileSpan !== undefined)

  return (
    <section className={`${styles.section} ${className}`}>
      <SectionTitle title={title} />
      <div
        className={`${styles.grid} ${isThreeItems ? styles.gridThreeItems : ''} ${
          keepSingleRowOnTablet ? styles.keepSingleRowOnTablet : ''
        } ${hasMobileTwoColumns ? styles.mobileTwoColumns : ''}`}
      >
        {services.map(service => {
          const tabletSpan = service.tabletSpan || 1
          const mobileSpan = service.mobileSpan ?? 1
          const tabletSpanClass = tabletSpan > 1 ? styles.tabletSpan : ''
          const mobileSpanClass = service.mobileSpan !== undefined && mobileSpan > 1 ? styles.mobileSpan : ''
          // mobileSpan이 "명시적으로 1"인 경우에만 모바일에서도 수직 레이아웃 유지
          const isMobileVertical = service.mobileSpan === 1
          // 모바일에서 title을 아이콘 아래에 배치
          const isMobileTitleBelowIcon = service.mobileTitleBelowIcon || false

          return (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
              onClick={service.onClick}
              className={`${tabletSpanClass} ${mobileSpanClass}`}
              mobileVertical={isMobileVertical}
              mobileTitleBelowIcon={isMobileTitleBelowIcon}
              style={
                tabletSpan > 1 || (service.mobileSpan !== undefined && mobileSpan > 1)
                  ? ({
                      '--tablet-span': tabletSpan > 1 ? String(tabletSpan) : undefined,
                      '--mobile-span':
                        service.mobileSpan !== undefined && mobileSpan > 1 ? String(mobileSpan) : undefined
                    } as React.CSSProperties)
                  : undefined
              }
            />
          )
        })}
      </div>
    </section>
  )
}
