'use client'

import React from 'react'
import styles from './InfoBox.module.scss'

export interface InfoBoxProps {
  /** 표시할 메시지 배열 */
  messages: string[]
  /** 제목 (선택적) */
  title?: string
  /** 아이콘 (선택적) */
  icon?: React.ReactNode
  /** 박스 스타일 변형 (기본값: 'info') */
  variant?: 'info' | 'warning' | 'guide'
  /** 메시지에 bullet 표시 여부 (guide variant용) */
  showBullets?: boolean
  /** 콘텐츠 시작 위치 (guide variant용, 기본값: 'left') */
  contentAlign?: 'left' | 'center'
  /** 마지막 메시지 강조 표시 (guide variant용) */
  highlightLast?: boolean
  /** 텍스트 색상 (기본값: 'default', 'black'로 설정 시 검정색) */
  textColor?: 'default' | 'black'
  /** 추가 클래스명 */
  className?: string
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  messages,
  title,
  icon,
  variant = 'info',
  showBullets = false,
  contentAlign = 'left',
  highlightLast = false,
  textColor = 'default',
  className = ''
}) => {
  const hasIcon = icon !== undefined
  const hasTitle = title !== undefined

  if (variant === 'warning' && (hasTitle || hasIcon)) {
    return (
      <div className={`${styles.warning} ${className}`}>
        {(hasTitle || hasIcon) && (
          <div className={styles.header}>
            {hasIcon && <div className={styles.icon}>{icon}</div>}
            {hasTitle && (
              <h4 className={`${styles.title} ${textColor === 'black' ? styles.textBlack : ''}`}>{title}</h4>
            )}
          </div>
        )}
        <div className={styles.infoBox}>
          <div className={styles.content}>
            {messages.map((message, index) => (
              <p key={index} className={`${styles.message} ${textColor === 'black' ? styles.textBlack : ''}`}>
                {message}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'guide') {
    return (
      <div className={`${styles.guide} ${contentAlign === 'center' ? styles.contentCenter : ''} ${className}`}>
        <div className={styles.guideInner}>
          {hasIcon && <div className={styles.guideIcon}>{icon}</div>}
          <div className={styles.guideContent}>
            {hasTitle && (
              <h3 className={`${styles.guideTitle} ${textColor === 'black' ? styles.textBlack : ''}`}>{title}</h3>
            )}
            <div className={styles.guideList}>
              {messages.map((message, index) => {
                const isLast = index === messages.length - 1
                const shouldHighlight = highlightLast && isLast
                return (
                  <div key={index} className={styles.guideItem}>
                    {showBullets && <span className={styles.bullet}></span>}
                    <p
                      className={`${styles.guideMessage} ${shouldHighlight ? styles.guideMessageHighlight : ''} ${
                        textColor === 'black' && !shouldHighlight ? styles.textBlack : ''
                      }`}
                    >
                      {message}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${styles.infoBox} ${hasIcon ? styles.withIcon : ''} ${
        contentAlign === 'left' ? styles.contentLeft : ''
      } ${className}`}
    >
      {hasIcon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        {hasTitle && <h4 className={`${styles.title} ${textColor === 'black' ? styles.textBlack : ''}`}>{title}</h4>}
        {messages.map((message, index) => (
          <p key={index} className={`${styles.message} ${textColor === 'black' ? styles.textBlack : ''}`}>
            {message}
          </p>
        ))}
      </div>
    </div>
  )
}
