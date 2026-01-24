import React from 'react'
import styles from './Textarea.module.scss'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.textareaWrapper} ${className}`}>
        {label && (
          <label htmlFor={props.id} className={styles.label}>
            {label}
          </label>
        )}
        <textarea ref={ref} className={`${styles.textarea} ${error ? styles.error : ''}`} {...props} />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
