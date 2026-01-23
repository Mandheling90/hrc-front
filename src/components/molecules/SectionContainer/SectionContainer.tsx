'use client'

import React from 'react'
import { ScrollableBox } from '@/components/atoms/ScrollableBox/ScrollableBox'
import styles from './SectionContainer.module.scss'

export interface SectionContainerProps {
  /** 상단 영역 (헤더) */
  header?: React.ReactNode
  /** 컨텐츠 영역 (아이템들이 자동으로 구분선으로 구분됨) */
  children: React.ReactNode
  /** 추가 클래스명 */
  className?: string
  /** 컨테이너 클래스명 */
  containerClassName?: string
  /** 스크롤 가능 여부 */
  scrollable?: boolean
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  header,
  children,
  className = '',
  containerClassName = '',
  scrollable = false
}) => {
  // children을 배열로 변환 (단일 요소도 배열로 처리)
  const childrenArray = React.Children.toArray(children).filter(Boolean)

  return (
    <div className={`${styles.sectionContainer} ${containerClassName}`}>
      {header && (
        <>
          <div className={styles.header}>{header}</div>
          {childrenArray.length > 0 && <div className={styles.divider} />}
        </>
      )}

      {scrollable ? (
        <ScrollableBox
          className={`${styles.content} ${styles.scrollable} ${className}`}
          padding={null}
          hasBorder={false}
          hasBackground={false}
        >
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && <div className={styles.itemDivider} />}
            </React.Fragment>
          ))}
        </ScrollableBox>
      ) : (
        <div className={`${styles.content} ${className}`}>
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && <div className={styles.itemDivider} />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
