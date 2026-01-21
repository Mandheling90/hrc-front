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
  horizontalLayout = false
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

  const content = (
    <>
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>{icon}</div>
        {mobileTitleBelowIcon && <h3 className={styles.titleBelowIcon}>{title}</h3>}
      </div>
      <div className={styles.textWrapper}>
        {!mobileTitleBelowIcon && <h3 className={styles.title}>{title}</h3>}
        {renderDescription()}
      </div>
    </>
  )

  const cardClassName = `${styles.card} ${mobileVertical ? styles.mobileVertical : ''} ${mobileTitleBelowIcon ? styles.mobileTitleBelowIcon : ''} ${mobileSpan === 2 ? styles.mobileSpanTwo : ''} ${mobileSpan === undefined ? styles.mobileSpanUnset : ''} ${horizontalLayout ? styles.horizontalLayout : ''} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

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
