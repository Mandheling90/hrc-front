'use client'

import React from 'react'
import Link from 'next/link'
import styles from './ServiceCard.module.scss'

export interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  /** 모바일에서 수직 레이아웃 유지 (mobileSpan이 1일 때) */
  mobileVertical?: boolean
  /** 모바일에서 title을 아이콘 아래에 배치 */
  mobileTitleBelowIcon?: boolean
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
  mobileTitleBelowIcon = false
}) => {
  const content = (
    <>
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>{icon}</div>
        {mobileTitleBelowIcon && <h3 className={styles.titleBelowIcon}>{title}</h3>}
      </div>
      <div className={styles.textWrapper}>
        {!mobileTitleBelowIcon && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.description}>{description}</p>
      </div>
    </>
  )

  const cardClassName = `${styles.card} ${mobileVertical ? styles.mobileVertical : ''} ${mobileTitleBelowIcon ? styles.mobileTitleBelowIcon : ''} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

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
