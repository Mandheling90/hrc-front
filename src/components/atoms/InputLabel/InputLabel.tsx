import React from 'react'
import styles from './InputLabel.module.scss'

interface InputLabelProps {
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export const InputLabel: React.FC<InputLabelProps> = ({
  htmlFor,
  required = false,
  children,
  className
}) => {
  return (
    <label htmlFor={htmlFor} className={`${styles.inputLabel} ${className || ''}`}>
      {required && <span className={styles.required}>*</span>}
      <span className={styles.inputLabelText}>{children}</span>
    </label>
  )
}
