'use client'

import React from 'react'
import styles from './ProcedureList.module.scss'

export interface ProcedureListItem {
  /** 리스트 항목 텍스트 */
  text: string
  /** 하이라이팅 여부 (빨간색 사각형 글머리 기호) */
  highlighted?: boolean
}

export interface ProcedureListProps {
  /** 리스트 항목 배열 */
  items: ProcedureListItem[]
  /** 추가 클래스명 */
  className?: string
}

export const ProcedureList: React.FC<ProcedureListProps> = ({ items, className = '' }) => {
  return (
    <div className={`${styles.procedureInfo} ${className}`}>
      <ul className={styles.procedureList}>
        {items.map((item, index) => (
          <li key={index} className={item.highlighted ? styles.procedureItemHighlighted : styles.procedureItem}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
