'use client'

import React from 'react'
import styles from './CardList.module.scss'

export interface CardRow {
  /** 행의 고유 키 */
  id: string
  /** 왼쪽에 표시할 내용 */
  leftContent: React.ReactNode
  /** 오른쪽에 표시할 내용 */
  rightContent: React.ReactNode
  /** 강조 표시 여부 (회색 배경 적용) */
  highlighted?: boolean
}

export interface CardListProps {
  /** 카드 데이터 배열 (각 카드는 여러 행으로 구성) */
  cards: CardRow[][]
  /** 각 카드의 고유 키를 반환하는 함수 */
  getCardKey: (card: CardRow[], index: number) => string | number
  /** 스크롤 가능한 높이 (지정 시 스크롤 영역 생성) */
  scrollableHeight?: string
  /** 추가 클래스명 */
  className?: string
}

export const CardList: React.FC<CardListProps> = ({ cards, getCardKey, scrollableHeight, className = '' }) => {
  return (
    <div
      className={`${styles.cardList} ${className}`}
      style={scrollableHeight ? { maxHeight: scrollableHeight } : undefined}
    >
      {cards.map((cardRows, cardIndex) => (
        <div key={getCardKey(cardRows, cardIndex)} className={styles.card}>
          {cardRows.map((row, rowIndex) => (
            <div key={row.id} className={`${styles.cardRow} ${row.highlighted ? styles.highlighted : ''}`}>
              <div className={styles.cardLeft}>{row.leftContent}</div>
              <div className={styles.cardRight}>{row.rightContent}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
