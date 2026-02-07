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
  /** 텍스트 오버플로우 처리 방식 */
  textOverflow?: 'wrap' | 'ellipsis' | 'scroll'
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
  /** 태블릿 카드 렌더링 함수 (선택적) */
  renderTabletCard?: (item: T, index: number) => React.ReactNode
  /** 추가 클래스명 */
  className?: string
  /** 기본 텍스트 오버플로우 처리 방식 (컬럼별 설정이 없을 때 사용) */
  defaultTextOverflow?: 'wrap' | 'ellipsis' | 'scroll'
  /** 헤더를 포함한 전체 영역에 스크롤 적용 여부 (기본값: false, 본문만 스크롤) */
  scrollWithHeader?: boolean
  /** 행이 하이라이트되어야 하는지 확인하는 함수 */
  isHighlighted?: (item: T, index: number) => boolean
  /** 하이라이트된 행에 적용할 추가 클래스명 */
  highlightedClassName?: string
  /** 헤더 숨김 여부 (기본값: false) */
  hideHeader?: boolean
  /** 행 호버 스타일 활성화 여부 (기본값: false) */
  enableHoverStyle?: boolean
}

export function Table<T>({
  columns,
  data,
  getRowKey,
  onRowClick,
  scrollableHeight,
  renderMobileCard,
  renderTabletCard,
  className = '',
  defaultTextOverflow = 'wrap',
  scrollWithHeader = false,
  isHighlighted,
  highlightedClassName = '',
  hideHeader = false,
  enableHoverStyle = false
}: TableProps<T>) {
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

  const hasHorizontalScroll = columns.some(col => (col.textOverflow || defaultTextOverflow) === 'scroll')

  return (
    <div className={`${styles.tableWrapper} ${enableHoverStyle ? styles.hoverEnabled : ''} ${className}`}>
      {scrollWithHeader ? (
        /* 헤더를 포함한 전체 영역 스크롤 */
        <div
          className={`${styles.tableContainer} ${hasHorizontalScroll ? styles.horizontalScroll : ''}`}
          style={scrollableHeight ? { maxHeight: scrollableHeight === '100%' ? '100%' : scrollableHeight } : undefined}
        >
          {/* 데스크톱/태블릿: 테이블 헤더 */}
          {!hideHeader && (
            <div className={styles.tableHeader}>
              {columns.map((column, index) => {
                const textOverflow = column.textOverflow || defaultTextOverflow
                const isFlexGrow = column.width === '1fr'
                return (
                  <React.Fragment key={column.id}>
                    <div
                      className={`${styles.headerCell} ${column.hideOnMobile ? styles.hideOnMobile : ''} ${
                        textOverflow === 'ellipsis' ? styles.ellipsis : ''
                      } ${textOverflow === 'scroll' ? styles.scroll : ''} ${isFlexGrow ? styles.flexGrow : ''}`}
                      style={
                        isFlexGrow
                          ? { flex: '1 1 0', textAlign: column.align || 'center' }
                          : { width: column.width, textAlign: column.align || 'center' }
                      }
                    >
                      {column.label}
                    </div>
                    {index < columns.length - 1 && <div className={styles.separator}></div>}
                  </React.Fragment>
                )
              })}
            </div>
          )}

          {/* 데스크톱/태블릿: 테이블 본문 */}
          <div className={`${styles.tableBody} ${styles.noScroll}`}>
            {data.map((item, rowIndex) => {
              const highlighted = isHighlighted ? isHighlighted(item, rowIndex) : false
              return (
                <div
                  key={getRowKey(item, rowIndex)}
                  className={`${styles.tableRow} ${onRowClick ? styles.clickable : ''} ${highlighted ? `${styles.highlighted} ${highlightedClassName}` : ''}`}
                  onClick={() => onRowClick?.(item, rowIndex)}
                >
                  {columns.map((column, colIndex) => {
                    const textOverflow = column.textOverflow || defaultTextOverflow
                    const isFlexGrow = column.width === '1fr'
                    return (
                      <React.Fragment key={column.id}>
                        <div
                          className={`${styles.dataCell} ${column.hideOnMobile ? styles.hideOnMobile : ''} ${
                            textOverflow === 'ellipsis' ? styles.ellipsis : ''
                          } ${textOverflow === 'scroll' ? styles.scroll : ''} ${isFlexGrow ? styles.flexGrow : ''} ${styles[`cell-${column.id}`] || ''}`}
                          style={
                            isFlexGrow
                              ? { flex: '1 1 0', textAlign: column.align || 'center' }
                              : { width: column.width, textAlign: column.align || 'center' }
                          }
                          data-column-id={column.id}
                        >
                          {renderCell(column, item, rowIndex)}
                        </div>
                        {colIndex < columns.length - 1 && <div className={styles.separator}></div>}
                      </React.Fragment>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* 기본: 본문만 스크롤 */
        <>
          {/* 데스크톱/태블릿: 테이블 헤더 */}
          {!hideHeader && (
            <div className={styles.tableHeader}>
              {columns.map((column, index) => {
                const textOverflow = column.textOverflow || defaultTextOverflow
                const isFlexGrow = column.width === '1fr'
                return (
                  <React.Fragment key={column.id}>
                    <div
                      className={`${styles.headerCell} ${column.hideOnMobile ? styles.hideOnMobile : ''} ${
                        textOverflow === 'ellipsis' ? styles.ellipsis : ''
                      } ${textOverflow === 'scroll' ? styles.scroll : ''} ${isFlexGrow ? styles.flexGrow : ''}`}
                      style={
                        isFlexGrow
                          ? { flex: '1 1 0', textAlign: column.align || 'center' }
                          : { width: column.width, textAlign: column.align || 'center' }
                      }
                    >
                      {column.label}
                    </div>
                    {index < columns.length - 1 && <div className={styles.separator}></div>}
                  </React.Fragment>
                )
              })}
            </div>
          )}

          {/* 데스크톱/태블릿: 테이블 본문 */}
          <div
            className={`${styles.tableBody} ${hasHorizontalScroll ? styles.horizontalScroll : ''}`}
            style={scrollableHeight && scrollableHeight !== '100%' ? { maxHeight: scrollableHeight } : undefined}
          >
            {data.map((item, rowIndex) => {
              const highlighted = isHighlighted ? isHighlighted(item, rowIndex) : false
              return (
                <div
                  key={getRowKey(item, rowIndex)}
                  className={`${styles.tableRow} ${onRowClick ? styles.clickable : ''} ${highlighted ? `${styles.highlighted} ${highlightedClassName}` : ''}`}
                  onClick={() => onRowClick?.(item, rowIndex)}
                >
                  {columns.map((column, colIndex) => {
                    const textOverflow = column.textOverflow || defaultTextOverflow
                    const isFlexGrow = column.width === '1fr'
                    return (
                      <React.Fragment key={column.id}>
                        <div
                          className={`${styles.dataCell} ${column.hideOnMobile ? styles.hideOnMobile : ''} ${
                            textOverflow === 'ellipsis' ? styles.ellipsis : ''
                          } ${textOverflow === 'scroll' ? styles.scroll : ''} ${isFlexGrow ? styles.flexGrow : ''} ${styles[`cell-${column.id}`] || ''}`}
                          style={
                            isFlexGrow
                              ? { flex: '1 1 0', textAlign: column.align || 'center' }
                              : { width: column.width, textAlign: column.align || 'center' }
                          }
                          data-column-id={column.id}
                        >
                          {renderCell(column, item, rowIndex)}
                        </div>
                        {colIndex < columns.length - 1 && <div className={styles.separator}></div>}
                      </React.Fragment>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* 태블릿: 카드 형태 */}
      {renderTabletCard && (
        <div className={styles.tabletCardList}>
          {data.map((item, index) => (
            <div key={getRowKey(item, index)}>{renderTabletCard(item, index)}</div>
          ))}
        </div>
      )}

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
