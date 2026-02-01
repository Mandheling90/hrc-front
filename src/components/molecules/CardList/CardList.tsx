'use client'

import React from 'react'
import styles from './CardList.module.scss'

export interface CardRow {
  /** 행의 고유 키 */
  id: string
  /** 왼쪽에 표시할 내용 */
  leftContent: React.ReactNode
  /** 오른쪽에 표시할 내용 */
  rightContent?: React.ReactNode
  /** 강조 표시 여부 (회색 배경 적용) */
  highlighted?: boolean
  /** 모바일에서 두 줄로 표시 여부 (라벨 위, 값 아래) */
  twoLine?: boolean
  /** 인포 행 여부 (두 컬럼 레이아웃, 각 컬럼에 라벨-값 쌍) */
  infoRow?: boolean
}

/** 인포 행에서 사용할 라벨-값 쌍 데이터 */
export interface InfoRowItem {
  label: string
  value: React.ReactNode
  /** 값에 강조 색상(primary) 적용 여부 */
  accent?: boolean
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
  /** 그리드 레이아웃 열 수 (지정 시 그리드 레이아웃 사용, 기본값: undefined - 세로 나열) */
  columns?: number
  /** 카드 클릭 핸들러 */
  onCardClick?: (cardIndex: number) => void
  /** 각 카드의 클래스명을 반환하는 함수 */
  getCardClassName?: (card: CardRow[], index: number) => string
  /** 카드 변형 (기본: default, infoCard: 의뢰환자 조회 스타일) */
  variant?: 'default' | 'infoCard'
}

/** 인포 행 컴포넌트 - 라벨과 값을 표시 */
export const InfoRowContent: React.FC<InfoRowItem> = ({ label, value, accent }) => (
  <div className={styles.infoRowContent}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={`${styles.infoValue} ${accent ? styles.infoValueAccent : ''}`}>{value}</span>
  </div>
)

export const CardList: React.FC<CardListProps> = ({
  cards,
  getCardKey,
  scrollableHeight,
  className = '',
  columns,
  onCardClick,
  getCardClassName,
  variant = 'default'
}) => {
  const isInfoCard = variant === 'infoCard'

  return (
    <div
      className={`${styles.cardList} ${columns ? styles.grid : ''} ${className}`}
      style={
        scrollableHeight
          ? { maxHeight: scrollableHeight }
          : columns
            ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
            : undefined
      }
    >
      {cards.map((cardRows, cardIndex) => (
        <div
          key={getCardKey(cardRows, cardIndex)}
          className={`${styles.card} ${isInfoCard ? styles.infoCard : ''} card ${onCardClick ? styles.clickable : ''} ${getCardClassName ? getCardClassName(cardRows, cardIndex) : ''}`}
          onClick={() => onCardClick?.(cardIndex)}
        >
          {cardRows.map(row => (
            <div
              key={row.id}
              className={`${styles.cardRow} ${row.highlighted ? styles.highlighted : ''} ${row.twoLine ? styles.twoLine : ''} ${row.infoRow ? styles.infoRow : ''} ${!row.rightContent ? styles.singleContent : ''}`}
            >
              <div className={`${styles.cardLeft} ${row.infoRow ? styles.infoColumn : ''}`}>
                {row.leftContent}
              </div>
              {row.rightContent && (
                <div className={`${styles.cardRight} ${row.infoRow ? styles.infoColumn : ''}`}>
                  {row.rightContent}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
