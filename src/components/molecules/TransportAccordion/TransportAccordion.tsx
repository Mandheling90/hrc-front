'use client'

import React, { useState } from 'react'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { ServiceTitleIcon } from '@/components/icons/ServiceTitleIcon'
import styles from './TransportAccordion.module.scss'

export interface TransportAccordionProps {
  /** 아코디언 제목 */
  title: string
  /** 아코디언 콘텐츠 */
  children: React.ReactNode
  /** 초기 확장 상태 */
  defaultExpanded?: boolean
  /** 콘텐츠 배경색 (기본: gray-1, 'white' 옵션 가능) */
  contentBackground?: 'gray' | 'white'
  /** 추가 클래스명 */
  className?: string
}

export const TransportAccordion: React.FC<TransportAccordionProps> = ({
  title,
  children,
  defaultExpanded = false,
  contentBackground = 'gray',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
  }

  const contentClass = contentBackground === 'white' ? styles.transportContentWhite : styles.transportContent

  return (
    <section className={`${styles.transportSection} ${className}`}>
      <button type='button' className={styles.transportHeader} onClick={toggleExpanded} aria-expanded={isExpanded}>
        <div className={styles.transportHeaderLeft}>
          <ServiceTitleIcon className={styles.transportIcon} />
          <h2 className={styles.transportTitle}>{title}</h2>
        </div>
        <div className={styles.chevronContainer}>
          {isExpanded ? (
            <ChevronUpIcon width={24} height={24} stroke='#636363' />
          ) : (
            <ChevronDownIcon width={24} height={24} fill='#636363' />
          )}
        </div>
      </button>

      {isExpanded && <div className={contentClass}>{children}</div>}
    </section>
  )
}
