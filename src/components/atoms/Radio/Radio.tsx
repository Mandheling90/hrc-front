import React from 'react'
import styles from './Radio.module.scss'

export interface RadioOption {
  value: string
  label: string
}

export interface RadioProps {
  name: string
  value: string
  options: RadioOption[]
  onChange: (value: string) => void
  className?: string
}

export const Radio: React.FC<RadioProps> = ({ name, value, options, onChange, className = '' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`${styles.radioGroup} ${className}`}>
      {options.map(option => (
        <label key={option.value} className={styles.radio}>
          <input
            type='radio'
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
