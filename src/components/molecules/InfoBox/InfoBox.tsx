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
            {hasTitle && <h4 className={styles.title}>{title}</h4>}
          </div>
        )}
        <div className={styles.infoBox}>
          <div className={styles.content}>
            {messages.map((message, index) => (
              <p key={index} className={styles.message}>
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
            {hasTitle && <h3 className={styles.guideTitle}>{title}</h3>}
            <div className={styles.guideList}>
              {messages.map((message, index) => (
                <div key={index} className={styles.guideItem}>
                  {showBullets && <span className={styles.bullet}></span>}
                  <p className={styles.guideMessage}>{message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.infoBox} ${hasIcon ? styles.withIcon : ''} ${className}`}>
      {hasIcon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        {hasTitle && <h4 className={styles.title}>{title}</h4>}
        {messages.map((message, index) => (
          <p key={index} className={styles.message}>
            {message}
          </p>
        ))}
      </div>
    </div>
  )
}
