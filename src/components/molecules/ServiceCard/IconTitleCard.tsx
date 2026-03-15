'use client'

import React from 'react'
import Link from '@/components/atoms/HospitalLink'
import styles from './IconTitleCard.module.scss'

export interface IconTitleCardProps {
  icon: React.ReactNode
  title: string
  description: string[]
  href?: string
  external?: boolean
  onClick?: () => void
  className?: string
}

/**
 * 아이콘+제목 그룹 카드 컴포넌트
 * 아이콘과 제목이 수직으로 그룹화되고, 설명이 옆에 배치되는 레이아웃
 */
export const IconTitleCard: React.FC<IconTitleCardProps> = ({
  icon,
  title,
  description,
  href,
  external,
  onClick,
  className = ''
}) => {
  const content = (
    <>
      <div className={styles.leftSection}>
        <div className={styles.iconCircle}>{icon}</div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.rightSection} data-title={title}>
        {description.map((line, index) => (
          <p key={index} className={styles.descriptionLine}>
            {line}
          </p>
        ))}
      </div>
    </>
  )

  const cardClassName = `${styles.card} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={cardClassName} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
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
    >
      {content}
    </div>
  )
}
