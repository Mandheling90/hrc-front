import React from 'react'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Input } from '@/components/atoms/Input/Input'
import styles from './CheckboxInputRow.module.scss'

export interface CheckboxInputRowProps {
  /** 체크박스 ID */
  checkboxId: string
  /** 체크박스 name */
  checkboxName: string
  /** 체크박스 체크 상태 */
  checked: boolean
  /** 체크박스 변경 핸들러 */
  onCheckboxChange: (checked: boolean) => void
  /** 체크박스 라벨 */
  checkboxLabel: string
  /** 인풋 ID */
  inputId: string
  /** 인풋 name */
  inputName: string
  /** 인풋 타입 */
  inputType?: string
  /** 인풋 placeholder */
  placeholder?: string
  /** 인풋 value */
  value: string
  /** 인풋 변경 핸들러 */
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** 인풋 disabled 여부 (체크박스가 체크되지 않았을 때) */
  disabled?: boolean
  /** 추가 className */
  className?: string
}

export const CheckboxInputRow: React.FC<CheckboxInputRowProps> = ({
  checkboxId,
  checkboxName,
  checked,
  onCheckboxChange,
  checkboxLabel,
  inputId,
  inputName,
  inputType = 'text',
  placeholder,
  value,
  onInputChange,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`${styles.checkboxInputRow} ${className}`}>
      <Checkbox
        id={checkboxId}
        name={checkboxName}
        checked={checked}
        onChange={onCheckboxChange}
        label={checkboxLabel}
      />
      <Input
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        disabled={disabled}
      />
    </div>
  )
}
