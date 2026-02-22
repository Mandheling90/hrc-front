'use client'

import React from 'react'
import Link from '@/components/atoms/HospitalLink'
import { VerticalServiceCardProps } from './types'
import styles from './VerticalServiceCard.module.scss'

/**
 * 세로형 서비스 카드
 * 아이콘 아래에 제목과 설명이 배치되는 형태
 */
export const VerticalServiceCard: React.FC<VerticalServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  className = '',
  style,
  size = 'default',
  mobileSpan,
  mobileAlign = 'left'
}) => {
  const renderDescription = () => {
    if (!description) return null
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
      </div>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>{title}</h3>
        {renderDescription()}
      </div>
    </>
  )

  // mobileSpan에 따른 클래스 추가
  const mobileSpanClass = mobileSpan === 2 ? styles.mobileSpanTwo : mobileSpan === 1 ? styles.mobileVertical : ''
  // mobileAlign에 따른 클래스 추가
  const mobileAlignClass = mobileAlign === 'center' ? styles.mobileAlignCenter : ''
  const cardClassName = `${styles.card} ${styles[size]} ${mobileSpanClass} ${mobileAlignClass} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

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
