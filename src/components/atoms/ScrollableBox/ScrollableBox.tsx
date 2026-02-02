import React from 'react'
import styles from './ScrollableBox.module.scss'

export interface ScrollableBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 스크롤 가능한 박스 내부 콘텐츠 */
  children: React.ReactNode
  /** 최대 높이 (기본값: 200px, undefined면 maxHeight 없음) */
  maxHeight?: string | number | null
  /** 패딩 (기본값: 16px, null이면 패딩 없음) */
  padding?: string | number | null
  /** 테두리 표시 여부 (기본값: true) */
  hasBorder?: boolean
  /** 배경색 표시 여부 (기본값: true) */
  hasBackground?: boolean
  /** 추가 CSS 클래스명 */
  className?: string
}

export const ScrollableBox = React.forwardRef<HTMLDivElement, ScrollableBoxProps>(
  (
    { children, maxHeight, padding = '16px', hasBorder = true, hasBackground = true, className, style, ...rest },
    ref
  ) => {
    const outerStyle: React.CSSProperties = {
      ...(maxHeight !== undefined &&
        maxHeight !== null && {
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
        }),
      ...style
    }

    const innerStyle: React.CSSProperties = {
      ...(padding !== null && {
        padding: typeof padding === 'number' ? `${padding}px` : padding
      })
    }

    const boxClassName = [
      styles.scrollableBox,
      !hasBorder && styles.noBorder,
      !hasBackground && styles.noBackground,
      className
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={boxClassName} style={outerStyle} {...rest}>
        <div className={styles.scrollableBoxInner} style={innerStyle}>
          {children}
        </div>
      </div>
    )
  }
)

ScrollableBox.displayName = 'ScrollableBox'
