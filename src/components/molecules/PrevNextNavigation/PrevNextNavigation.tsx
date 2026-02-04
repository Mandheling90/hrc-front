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
  const hasPrev = !!prev?.title
  const hasNext = !!next?.title

  return (
    <section className={`${styles.navigationSection} ${className}`}>
      {/* 이전 글 */}
      <div className={styles.navItem}>
        <div className={styles.navLabelSection}>
          <ChevronUpIcon width={24} height={24} stroke={hasPrev ? '#000000' : '#636363'} className={styles.navIcon} />
          <span className={`${styles.navLabel} ${!hasPrev ? styles.navLabelDisabled : ''}`}>이전 글</span>
        </div>
        <div className={styles.navContent}>
          {hasPrev ? (
            <button type='button' onClick={prev?.onClick} className={styles.navLink}>
              {prev?.title}
            </button>
          ) : (
            <span className={styles.navEmpty}>이전 글이 없습니다.</span>
          )}
        </div>
      </div>

      {/* 다음 글 */}
      <div className={styles.navItem}>
        <div className={styles.navLabelSection}>
          <ChevronDownIcon width={24} height={24} fill={hasNext ? '#000000' : '#636363'} className={styles.navIcon} />
          <span className={`${styles.navLabel} ${!hasNext ? styles.navLabelDisabled : ''}`}>다음 글</span>
        </div>
        <div className={styles.navContent}>
          {hasNext ? (
            <button type='button' onClick={next?.onClick} className={styles.navLink}>
              {next?.title}
            </button>
          ) : (
            <span className={styles.navEmpty}>다음 글이 없습니다.</span>
          )}
        </div>
      </div>
    </section>
  )
}
