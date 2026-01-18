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
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  onClick,
  className = ''
}) => {
  const content = (
    <>
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>{icon}</div>
      </div>
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${styles.card} ${styles.linkCard} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <div
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {content}
    </div>
  )
}
