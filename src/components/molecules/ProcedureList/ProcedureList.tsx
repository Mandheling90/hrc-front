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
  /** 라벨 (예: "• 대상", "• 신청방법") */
  label?: string
  /** 추가 클래스명 */
  className?: string
}

export const ProcedureList: React.FC<ProcedureListProps> = ({ items, label, className = '' }) => {
  // label에서 • 기호를 분리하여 빨간색 모서리 깎인 사각형으로 표시
  const renderLabel = () => {
    if (!label) return null
    if (label.startsWith('•')) {
      return (
        <div className={styles.label}>
          <span className={styles.bullet}></span>
          {label.slice(1).trim()}
        </div>
      )
    }
    return <div className={styles.label}>{label}</div>
  }

  return (
    <div className={`${styles.procedureInfo} ${className}`}>
      {renderLabel()}
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
