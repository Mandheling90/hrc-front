'use client'

import React from 'react'
import styles from './NoticeList.module.scss'

export interface NoticeItem {
  /** 항목 텍스트 (단일 문자열) */
  text?: string
  /** 항목의 여러 문단 (복수의 문단이 필요한 경우) */
  paragraphs?: string[]
}

export interface NoticeListProps {
  /** 제목 */
  title: string
  /** 아이콘 (선택적) */
  icon?: React.ReactNode
  /** 항목 배열 */
  items: NoticeItem[]
  /** 추가 클래스명 */
  className?: string
}

export const NoticeList: React.FC<NoticeListProps> = ({
  title,
  icon,
  items,
  className = ''
}) => {
  return (
    <div className={`${styles.noticeSection} ${className}`}>
      <div className={styles.noticeHeader}>
        {icon && icon}
        <h4 className={styles.noticeTitle}>{title}</h4>
      </div>
      <div className={styles.noticeList}>
        {items.map((item, index) => (
          <div key={index} className={styles.noticeItem}>
            <span className={styles.noticeBullet}>-</span>
            {item.text ? (
              <p className={styles.noticeText}>{item.text}</p>
            ) : item.paragraphs ? (
              <div className={styles.noticeText}>
                {item.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
