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
  /** 라벨 (예: "대상", "신청방법" - • 기호는 자동으로 추가됨) */
  label?: string
  /** 붉은 글씨 공지 (리스트 하단에 표시) */
  note?: string
  /** 추가 클래스명 */
  className?: string
}

export const ProcedureList: React.FC<ProcedureListProps> = ({ items, label, note, className = '' }) => {
  // label이 있으면 항상 빨간색 모서리 깎인 사각형 bullet을 표시
  const renderLabel = () => {
    if (!label) return null
    // • 기호가 있으면 제거하고, 없으면 그대로 사용
    const labelText = label.startsWith('•') ? label.slice(1).trim() : label.trim()
    return (
      <div className={styles.label}>
        <span className={styles.bullet}></span>
        {labelText}
      </div>
    )
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
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
