import React from 'react'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import styles from './CheckboxGroup.module.scss'

export interface CheckboxOption {
  /** 체크박스 ID */
  id: string
  /** 체크박스 name */
  name: string
  /** 체크박스 체크 상태 */
  checked: boolean
  /** 체크박스 변경 핸들러 */
  onChange: (checked: boolean) => void
  /** 체크박스 라벨 */
  label: string
  /** 체크박스 라벨의 최소 너비 (px 또는 rem 단위) */
  minWidth?: string
  /** 체크박스 disabled 여부 */
  disabled?: boolean
}

export interface CheckboxGroupProps {
  /** 체크박스 옵션 배열 */
  options: CheckboxOption[]
  /** 모든 체크박스 라벨의 최소 너비 (px 또는 rem 단위, 개별 minWidth보다 우선순위 낮음) */
  minWidth?: string
  /** 그룹 간격 (기본값: $spacing-4 = 16px) */
  gap?: string
  /** 태블릿/모바일에서도 한 줄로 유지할지 여부 (기본값: false) */
  keepSingleRow?: boolean
  /** 추가 className */
  className?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  minWidth,
  gap,
  keepSingleRow = false,
  className = ''
}) => {
  const groupStyle = gap ? { gap } : undefined

  return (
    <div
      className={`${styles.checkboxGroup} ${keepSingleRow ? styles.keepSingleRow : ''} ${className}`}
      style={groupStyle}
    >
      {options.map(option => (
        <Checkbox
          key={option.id}
          id={option.id}
          name={option.name}
          checked={option.checked}
          onChange={option.onChange}
          label={option.label}
          minWidth={option.minWidth || minWidth}
          disabled={option.disabled}
        />
      ))}
    </div>
  )
}
