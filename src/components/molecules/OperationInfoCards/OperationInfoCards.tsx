import React from 'react'
import styles from './OperationInfoCards.module.scss'

export interface InfoRow {
  label: string
  value: string
}

export interface OperationInfoCard {
  icon: React.ReactNode
  title: string
  rows: InfoRow[]
}

export interface OperationInfoCardsProps {
  cards: OperationInfoCard[]
  className?: string
  applyTabletStyle?: boolean // 데스크탑에서도 태블릿 스타일 적용 여부
}

export const OperationInfoCards: React.FC<OperationInfoCardsProps> = ({
  cards,
  className = '',
  applyTabletStyle = false
}) => {
  const isThreeCards = cards.length === 3

  return (
    <div
      className={`${styles.infoCards} ${isThreeCards ? styles.threeCards : ''} ${
        applyTabletStyle ? styles.tabletStyle : ''
      } ${className}`}
    >
      {cards.map((card, index) => (
        <div key={index} className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <div className={styles.infoIconCircle}>{card.icon}</div>
            <p className={styles.infoTitle}>{card.title}</p>
          </div>
          <div className={styles.infoContent}>
            <div className={styles.infoRowGroup}>
              {card.rows.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>{row.label}</span>
                    <span className={styles.infoValue}>{row.value}</span>
                  </div>
                  {rowIndex < card.rows.length - 1 && (
                    <span className={styles.infoDivider}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
