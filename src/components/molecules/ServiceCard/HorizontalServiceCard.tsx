'use client'

import React from 'react'
import Link from 'next/link'
import { HorizontalServiceCardProps } from './types'
import styles from './HorizontalServiceCard.module.scss'

/**
 * 가로형 서비스 카드
 * 아이콘 옆에 제목과 설명이 배치되는 형태
 */
export const HorizontalServiceCard: React.FC<HorizontalServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  className = '',
  style,
  size = 'default'
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

  const cardClassName = `${styles.card} ${styles[size]} ${onClick ? styles.clickable : ''} ${href ? styles.linkCard : ''} ${className}`

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
