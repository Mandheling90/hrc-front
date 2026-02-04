import React from 'react'
import styles from './OperationInfoCards.module.scss'

export interface InfoRow {
  label: string
  value: string
}

export interface OperationInfoCard {
  icon: React.ReactNode
  title: string
  subtitle?: string
  rows: InfoRow[]
  rowLayout?: 'horizontal' | 'vertical'
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
          <div className={styles.infoIconCircle}>{card.icon}</div>
          <div className={styles.infoTitleGroup}>
            <p className={styles.infoTitle}>{card.title}</p>
            {card.subtitle && <p className={styles.infoSubtitle}>{card.subtitle}</p>}
          </div>
          <div
            className={`${styles.infoRowGroup} ${card.rowLayout === 'vertical' ? styles.verticalRows : ''}`}
          >
            {card.rows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>{row.label}</span>
                  <span className={styles.infoValue}>{row.value}</span>
                </div>
                {card.rowLayout !== 'vertical' && rowIndex < card.rows.length - 1 && (
                  <div className={styles.infoDivider} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
