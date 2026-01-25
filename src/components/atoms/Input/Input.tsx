import React from 'react'
import styles from './Input.module.scss'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  /** 너비 (예: '320px', '100%', 320) */
  width?: string | number
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, width, className = '', ...props }, ref) => {
    // width 스타일 계산
    const widthStyle = width
      ? typeof width === 'number'
        ? { width: `${width}px` }
        : { width }
      : undefined

    return (
      <div className={`${styles.inputWrapper} ${className}`} style={widthStyle}>
        {label && (
          <label htmlFor={props.id} className={styles.label}>
            {label}
          </label>
        )}
        <input ref={ref} className={`${styles.input} ${error ? styles.error : ''}`} {...props} />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
