import React from 'react'
import styles from './Textarea.module.scss'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
  /** 테두리 제거 (컨테이너에서 테두리를 그릴 때 사용) */
  borderless?: boolean
  /** 포커스 시 테두리/하이라이트 제거 */
  disableFocusHighlight?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', borderless = false, disableFocusHighlight = false, ...props }, ref) => {
    const textareaClassName = [
      styles.textarea,
      error ? styles.error : '',
      borderless ? styles.borderless : '',
      disableFocusHighlight ? styles.disableFocusHighlight : ''
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={`${styles.textareaWrapper} ${className}`}>
        {label && (
          <label htmlFor={props.id} className={styles.label}>
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClassName} {...props} />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
