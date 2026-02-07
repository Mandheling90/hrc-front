import React from 'react'
import styles from './InputLabel.module.scss'

interface InputLabelProps {
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
  className?: string
  /** 라벨 텍스트 뒤에 추가할 요소 (예: 유효성 상태 텍스트) */
  extra?: React.ReactNode
}

export const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, required = false, children, className, extra }) => {
  return (
    <label htmlFor={htmlFor} className={`${styles.inputLabel} ${className || ''}`}>
      {required && <span className={styles.required}>*</span>}
      <span className={styles.inputLabelText}>{children}</span>
      {extra}
    </label>
  )
}
