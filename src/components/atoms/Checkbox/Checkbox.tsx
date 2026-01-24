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
  minWidth
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked)
    }
  }

  const Component = label ? 'label' : 'div'

  const labelStyle = minWidth ? { minWidth } : undefined

  return (
    <Component className={`${label ? styles.checkboxLabel : ''} ${className}`} style={labelStyle}>
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
