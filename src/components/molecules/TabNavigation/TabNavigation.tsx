'use client'

import React, { useRef, useState, useCallback } from 'react'
import styles from './TabNavigation.module.scss'

export interface TabItem {
  /** 탭 고유 ID */
  id: string
  /** 탭 레이블 */
  label: string
  /** 스텝 번호 (signup variant에서 사용) */
  stepNumber?: number
}

export interface TabNavigationProps {
  /** 탭 목록 */
  tabs: TabItem[]
  /** 현재 활성화된 탭 ID */
  activeTab: string
  /** 탭 변경 핸들러 */
  onTabChange: (tabId: string) => void
  /** 추가 클래스명 */
  className?: string
  /** 스타일 변형 (default: 일반 탭, signup: 회원가입 스텝) */
  variant?: 'default' | 'signup'
  /** 클릭 비활성화 여부 (signup에서 스텝 이동 방지용) */
  disableClick?: boolean
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  variant = 'default',
  disableClick = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hasDragged, setHasDragged] = useState(false)

  // 마우스/터치 시작
  const handleDragStart = useCallback((clientX: number) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setHasDragged(false)
    setStartX(clientX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }, [])

  // 마우스/터치 이동
  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return
      const x = clientX - containerRef.current.offsetLeft
      const walk = (x - startX) * 1.5 // 스크롤 속도 조절
      if (Math.abs(walk) > 5) {
        setHasDragged(true)
      }
      containerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  // 마우스/터치 종료
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.pageX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleDragMove(e.pageX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    handleDragEnd()
  }

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].pageX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].pageX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // 탭 클릭 핸들러 (드래그 중일 때는 클릭 방지)
  const handleTabClick = (tabId: string) => {
    if (disableClick) return
    if (hasDragged) {
      setHasDragged(false)
      return
    }
    onTabChange(tabId)
  }

  const variantClass = variant === 'signup' ? styles.signupVariant : ''

  return (
    <div
      ref={containerRef}
      className={`${styles.tabsSection} ${variantClass} ${isDragging ? styles.dragging : ''} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type='button'
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {variant === 'signup' && tab.stepNumber !== undefined && (
              <span className={styles.stepNumber}>Step.{String(tab.stepNumber).padStart(2, '0')}</span>
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
