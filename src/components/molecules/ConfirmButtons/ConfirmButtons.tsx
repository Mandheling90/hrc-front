'use client'

import React, { useState } from 'react'
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
    /** 버튼 스타일 (기본값: 'outline') */
    variant?: 'outline' | 'primaryOutline'
  }
  /** 호버 시 두 버튼 스타일 스왑 (기본값: false) */
  swapOnHover?: boolean
  /** margin-top 제거 여부 */
  noMargin?: boolean
  /** 추가 클래스명 */
  className?: string
}

export const ConfirmButtons: React.FC<ConfirmButtonsProps> = ({
  primaryButton,
  secondaryButton,
  swapOnHover = false,
  noMargin = false,
  className
}) => {
  const isSingleButton = !secondaryButton
  const [hoveredButton, setHoveredButton] = useState<'primary' | 'secondary' | null>(null)

  const getSecondaryVariant = () => {
    const base = secondaryButton?.variant || 'outline'
    if (!swapOnHover) return base
    // 기본: 둘 다 흰 버튼, 호버한 버튼만 primary로 전환
    return hoveredButton === 'secondary' ? 'primary' : 'primaryOutline'
  }

  const getPrimaryVariant = () => {
    const base = primaryButton.variant || 'primary'
    if (!swapOnHover) return base
    // 기본: 둘 다 흰 버튼, 호버한 버튼만 primary로 전환
    return hoveredButton === 'primary' ? 'primary' : 'primaryOutline'
  }

  return (
    <div
      className={`${styles.confirmButtons} ${isSingleButton ? styles.singleButton : ''} ${noMargin ? styles.noMargin : ''} ${className || ''}`}
    >
      {secondaryButton && (
        <Button
          variant={getSecondaryVariant()}
          size='large'
          onClick={secondaryButton.onClick}
          disabled={secondaryButton.disabled}
          className={styles.button}
          onMouseEnter={swapOnHover ? () => setHoveredButton('secondary') : undefined}
          onMouseLeave={swapOnHover ? () => setHoveredButton(null) : undefined}
        >
          {secondaryButton.label}
        </Button>
      )}
      <Button
        variant={getPrimaryVariant()}
        size='large'
        onClick={primaryButton.onClick}
        disabled={primaryButton.disabled}
        className={styles.button}
        onMouseEnter={swapOnHover ? () => setHoveredButton('primary') : undefined}
        onMouseLeave={swapOnHover ? () => setHoveredButton(null) : undefined}
      >
        {primaryButton.label}
      </Button>
    </div>
  )
}
