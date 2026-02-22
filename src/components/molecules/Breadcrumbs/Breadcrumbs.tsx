'use client'

import React from 'react'
import Link from '@/components/atoms/HospitalLink'
import styles from './Breadcrumbs.module.scss'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  iconAfter?: boolean
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`${styles.breadcrumbs} ${className}`} aria-label='Breadcrumb'>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden='true'>
                ›
              </span>
            )}
            {item.icon && !item.iconAfter && <span className={styles.icon}>{item.icon}</span>}
            {item.label &&
              (item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              ))}
            {item.icon && item.iconAfter && <span className={styles.icon}>{item.icon}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
