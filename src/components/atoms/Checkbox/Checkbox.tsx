import React from 'react'
import styles from './Checkbox.module.scss'

export interface CheckboxProps {
  id?: string
  name?: string
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string | React.ReactNode
  disabled?: boolean
  className?: string
  'aria-label'?: string
  /** 체크박스 라벨의 최소 너비 (px 또는 rem 단위) */
  minWidth?: string
  /** 항상 진한 색상 유지 여부 (기본값: false - 체크 상태에 따라 색상 변경) */
  alwaysDark?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  minWidth,
  alwaysDark = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked)
    }
  }

  const Component = label ? 'label' : 'div'

  const labelStyle = minWidth ? { minWidth } : undefined

  return (
    <Component
      className={`${label ? styles.checkboxLabel : ''} ${alwaysDark ? styles.alwaysDark : ''} ${className}`}
      style={labelStyle}
    >
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkbox}
        aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      />
      {label && <span>{label}</span>}
    </Component>
  )
}
