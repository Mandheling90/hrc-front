'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button/Button'
import styles from './ConfirmButtons.module.scss'

export interface ConfirmButtonsProps {
  /** 주요 버튼 (오른쪽 또는 단일 버튼) */
  primaryButton: {
    label: string
    onClick: () => void
    disabled?: boolean
    /** 버튼 스타일 (기본값: 'primary') */
    variant?: 'primary' | 'outline'
  }
  /** 보조 버튼 (왼쪽, 선택사항) */
  secondaryButton?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  /** margin-top 제거 여부 */
  noMargin?: boolean
  /** 추가 클래스명 */
  className?: string
}

export const ConfirmButtons: React.FC<ConfirmButtonsProps> = ({
  primaryButton,
  secondaryButton,
  noMargin = false,
  className
}) => {
  const isSingleButton = !secondaryButton

  return (
    <div
      className={`${styles.confirmButtons} ${isSingleButton ? styles.singleButton : ''} ${noMargin ? styles.noMargin : ''} ${className || ''}`}
    >
      {secondaryButton && (
        <Button
          variant='outline'
          size='large'
          onClick={secondaryButton.onClick}
          disabled={secondaryButton.disabled}
          className={styles.button}
        >
          {secondaryButton.label}
        </Button>
      )}
      <Button
        variant={primaryButton.variant || 'primary'}
        size='large'
        onClick={primaryButton.onClick}
        disabled={primaryButton.disabled}
        className={styles.button}
      >
        {primaryButton.label}
      </Button>
    </div>
  )
}
