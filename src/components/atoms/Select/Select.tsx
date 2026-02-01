'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon'
import styles from './Select.module.scss'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  /** 옵션 목록 */
  options: SelectOption[]
  /** 선택된 값 */
  value?: string
  /** 기본값 */
  defaultValue?: string
  /** 변경 핸들러 */
  onChange?: (value: string) => void
  /** 라벨 */
  label?: string
  /** 에러 메시지 */
  error?: string
  /** 비활성화 여부 */
  disabled?: boolean
  /** placeholder */
  placeholder?: string
  /** 너비 (예: '320px', '100%', 320) */
  width?: string | number
  /** className */
  className?: string
  /** id */
  id?: string
  /** name */
  name?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  error,
  disabled = false,
  placeholder,
  width,
  className = '',
  id,
  name
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string>(defaultValue || '')
  const selectRef = useRef<HTMLDivElement>(null)
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue)
    }
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === currentValue)
  const displayText = selectedOption ? selectedOption.label : placeholder || ''

  // width 스타일 계산
  const widthStyle = width ? (typeof width === 'number' ? { width: `${width}px` } : { width }) : undefined

  return (
    <div className={`${styles.selectWrapper} ${className}`} ref={selectRef} style={widthStyle}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectContainer}>
        <button
          type='button'
          id={id}
          className={`${styles.selectButton} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''} ${isOpen ? styles.open : ''}`}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-label={label || '선택'}
        >
          <span className={styles.selectText}>{displayText}</span>
          <div className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
            <ChevronRightIcon width={24} height={24} stroke='var(--gray-9)' />
          </div>
        </button>

        {isOpen && !disabled && (
          <div className={styles.dropdown}>
            {options.map(option => {
              const isSelected = option.value === currentValue
              return (
                <button
                  key={option.value}
                  type='button'
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role='option'
                  aria-selected={isSelected}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        )}

        {/* 숨겨진 input (form 제출용) */}
        {name && <input type='hidden' name={name} value={currentValue} />}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

Select.displayName = 'Select'
