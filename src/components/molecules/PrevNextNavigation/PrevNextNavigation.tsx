import React from 'react'
import styles from './PrevNextNavigation.module.scss'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'

export interface PrevNextItem {
  title?: string
  onClick?: () => void
}

export interface PrevNextNavigationProps {
  prev?: PrevNextItem | null
  next?: PrevNextItem | null
  className?: string
}

export const PrevNextNavigation: React.FC<PrevNextNavigationProps> = ({ prev, next, className = '' }) => {
  return (
    <section className={`${styles.navigationSection} ${className}`}>
      <div className={styles.navItem}>
        <div className={styles.navHeader}>
          <ChevronUpIcon width={24} height={24} stroke='#636363' className={styles.navIcon} />
          <span className={styles.navLabel}>이전 글</span>
          {prev?.title ? (
            <button type='button' onClick={prev.onClick} className={styles.navLink}>
              {prev.title}
            </button>
          ) : (
            <span className={styles.navEmpty}>이전 글이 없습니다.</span>
          )}
        </div>
      </div>

      <div className={styles.navItem}>
        <div className={styles.navHeader}>
          <ChevronDownIcon width={24} height={24} fill='#636363' className={styles.navIcon} />
          <span className={styles.navLabel}>다음 글</span>
          {next?.title ? (
            <button type='button' onClick={next.onClick} className={styles.navLink}>
              {next.title}
            </button>
          ) : (
            <span className={styles.navEmpty}>다음 글이 없습니다.</span>
          )}
        </div>
      </div>
    </section>
  )
}

