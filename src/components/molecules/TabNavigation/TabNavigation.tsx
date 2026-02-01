'use client'

import React from 'react'
import styles from './TabNavigation.module.scss'

export interface TabItem {
  /** 탭 고유 ID */
  id: string
  /** 탭 레이블 */
  label: string
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
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`${styles.tabsSection} ${className}`}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type='button'
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
