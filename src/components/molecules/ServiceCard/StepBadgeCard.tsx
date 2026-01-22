'use client'

import React from 'react'
import Link from 'next/link'
import { StepBadgeCardProps } from './types'
import styles from './StepBadgeCard.module.scss'

/**
 * 스텝 배지 카드
 * 상단에 배지가 있고, 아이콘 아래에 제목이 배치되는 형태
 * 절차나 단계를 표시할 때 사용
 */
export const StepBadgeCard: React.FC<StepBadgeCardProps> = ({
  icon,
  title,
  badgeText,
  href,
  onClick,
  className = '',
  style
}) => {
  const content = (
    <>
      <div className={styles.stepBadge}>{badgeText}</div>
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>{icon}</div>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </>
  )

  const cardClassName = `${styles.card} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

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
