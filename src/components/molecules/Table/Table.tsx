'use client'

import React from 'react'
import styles from './Table.module.scss'

export interface TableColumn<T = any> {
  /** 컬럼 ID (고유 식별자) */
  id: string
  /** 컬럼 헤더 레이블 */
  label: string
  /** 컬럼 너비 (예: '100px', '1fr', 'auto') */
  width?: string
  /** 셀 렌더링 함수 (커스텀 렌더링) */
  renderCell?: (item: T, index: number) => React.ReactNode
  /** 기본값으로 표시할 필드명 (renderCell이 없을 때 사용) */
  field?: keyof T
  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right'
  /** 모바일에서 숨김 여부 */
  hideOnMobile?: boolean
}

export interface TableProps<T = any> {
  /** 컬럼 정의 배열 */
  columns: TableColumn<T>[]
  /** 테이블 데이터 배열 */
  data: T[]
  /** 각 행의 고유 키를 반환하는 함수 */
  getRowKey: (item: T, index: number) => string | number
  /** 행 클릭 핸들러 */
  onRowClick?: (item: T, index: number) => void
  /** 스크롤 가능한 높이 (지정 시 스크롤 영역 생성) */
  scrollableHeight?: string
  /** 모바일 카드 렌더링 함수 (선택적) */
  renderMobileCard?: (item: T, index: number) => React.ReactNode
  /** 추가 클래스명 */
  className?: string
}

export const Table = <T,>({
  columns,
  data,
  getRowKey,
  onRowClick,
  scrollableHeight,
  renderMobileCard,
  className = ''
}: TableProps<T>) => {
  // 기본 셀 렌더링
  const renderCell = (column: TableColumn<T>, item: T, index: number) => {
    if (column.renderCell) {
      return column.renderCell(item, index)
    }
    if (column.field) {
      return item[column.field] as React.ReactNode
    }
    return null
  }

  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      {/* 데스크톱/태블릿: 테이블 헤더 */}
      <div className={styles.tableHeader}>
        {columns.map((column, index) => (
          <React.Fragment key={column.id}>
            <div
              className={`${styles.headerCell} ${column.hideOnMobile ? styles.hideOnMobile : ''}`}
              style={{ width: column.width, textAlign: column.align || 'center' }}
            >
              {column.label}
            </div>
            {index < columns.length - 1 && <div className={styles.separator}></div>}
          </React.Fragment>
        ))}
      </div>

      {/* 데스크톱/태블릿: 테이블 본문 */}
      <div className={styles.tableBody} style={{ maxHeight: scrollableHeight }}>
        {data.map((item, rowIndex) => (
          <div
            key={getRowKey(item, rowIndex)}
            className={`${styles.tableRow} ${onRowClick ? styles.clickable : ''}`}
            onClick={() => onRowClick?.(item, rowIndex)}
          >
            {columns.map((column, colIndex) => (
              <React.Fragment key={column.id}>
                <div
                  className={`${styles.dataCell} ${column.hideOnMobile ? styles.hideOnMobile : ''}`}
                  style={{ width: column.width, textAlign: column.align || 'center' }}
                >
                  {renderCell(column, item, rowIndex)}
                </div>
                {colIndex < columns.length - 1 && <div className={styles.separator}></div>}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      {/* 모바일: 카드 형태 */}
      {renderMobileCard && (
        <div className={styles.mobileCardList}>
          {data.map((item, index) => (
            <div key={getRowKey(item, index)}>{renderMobileCard(item, index)}</div>
          ))}
        </div>
      )}
    </div>
  )
}
