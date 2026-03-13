import React from 'react'
import styles from './Skeleton.module.scss'

export interface SkeletonProps {
  /** 너비 (CSS 값) */
  width?: string | number
  /** 높이 (CSS 값) */
  height?: string | number
  /** 형태 변형 */
  variant?: 'text' | 'circle' | 'rounded' | 'rect'
  /** 추가 클래스명 */
  className?: string
  /** 반복 개수 */
  count?: number
  /** 반복 간격 (CSS 값) */
  gap?: string | number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height,
  variant = 'rect',
  className,
  count = 1,
  gap = 8
}) => {
  const variantClass = variant !== 'rect' ? styles[variant] : ''

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }

  if (variant === 'circle') {
    style.width = style.width || style.height
    style.height = style.height || style.width
  }

  const element = (
    <div
      className={`${styles.skeleton} ${variantClass} ${className || ''}`.trim()}
      style={style}
      aria-hidden='true'
    />
  )

  if (count <= 1) return element

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: typeof gap === 'number' ? `${gap}px` : gap }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`${styles.skeleton} ${variantClass} ${className || ''}`.trim()}
          style={style}
          aria-hidden='true'
        />
      ))}
    </div>
  )
}
