'use client'

import React from 'react'
import Link from 'next/link'
import styles from './ServiceCard.module.scss'

export interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string | string[]
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  /** 모바일에서 수직 레이아웃 유지 (mobileSpan이 1일 때) */
  mobileVertical?: boolean
  /** 모바일에서 title을 아이콘 아래에 배치 */
  mobileTitleBelowIcon?: boolean
  /** 모바일에서 span 값 (2일 때 스타일 적용) */
  mobileSpan?: number
  /** 항상 가로 레이아웃으로 표시 (모든 화면 크기에서 아이콘과 텍스트가 나란히 배치) */
  horizontalLayout?: boolean
  /** 스텝 배지 텍스트 (설정 시 상단에 배지로 표시, Figma 디자인에 맞춤) */
  stepBadge?: string | string[]
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  className = '',
  style,
  mobileVertical = false,
  mobileTitleBelowIcon = false,
  mobileSpan,
  horizontalLayout = false,
  stepBadge
}) => {
  // description이 배열인 경우 줄바꿈 처리
  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <p className={styles.description}>
          {description.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      )
    }
    return <p className={styles.description}>{description}</p>
  }

  // stepBadge 렌더링
  const renderStepBadge = () => {
    if (!stepBadge) return null
    const badgeText = Array.isArray(stepBadge) ? stepBadge.join(' ') : stepBadge
    return <div className={styles.stepBadge}>{badgeText}</div>
  }

  // stepBadge가 있을 때는 항상 제목을 아이콘 아래에 배치
  const shouldShowTitleBelowIcon = stepBadge || mobileTitleBelowIcon

  const content = (
    <>
      {stepBadge && renderStepBadge()}
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>{icon}</div>
        {shouldShowTitleBelowIcon && <h3 className={styles.titleBelowIcon}>{title}</h3>}
      </div>
      {!shouldShowTitleBelowIcon && (
        <div className={styles.textWrapper}>
          <h3 className={styles.title}>{title}</h3>
          {renderDescription()}
        </div>
      )}
    </>
  )

  const cardClassName = `${styles.card} ${mobileVertical ? styles.mobileVertical : ''} ${mobileTitleBelowIcon ? styles.mobileTitleBelowIcon : ''} ${mobileSpan === 2 ? styles.mobileSpanTwo : ''} ${mobileSpan === undefined ? styles.mobileSpanUnset : ''} ${horizontalLayout ? styles.horizontalLayout : ''} ${stepBadge ? styles.stepBadgeCard : ''} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={cardClassName} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <div
      className={cardClassName}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {content}
    </div>
  )
}
