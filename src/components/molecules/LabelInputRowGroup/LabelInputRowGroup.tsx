import React from 'react'
import { LabelInputRow } from '@/components/molecules/LabelInputRow/LabelInputRow'
import styles from './LabelInputRowGroup.module.scss'

export interface LabelInputRowOption {
  /** 라벨 타입: 'checkbox' 또는 'text' (기본값: 'text') */
  labelType?: 'checkbox' | 'text'
  /** 텍스트 라벨 (labelType이 'text'일 때 사용) */
  textLabel?: string
  /** 체크박스 ID (labelType이 'checkbox'일 때 필수) */
  checkboxId?: string
  /** 체크박스 name (labelType이 'checkbox'일 때 필수) */
  checkboxName?: string
  /** 체크박스 체크 상태 (labelType이 'checkbox'일 때 필수) */
  checked?: boolean
  /** 체크박스 변경 핸들러 (labelType이 'checkbox'일 때 필수) */
  onCheckboxChange?: (checked: boolean) => void
  /** 체크박스 라벨 (labelType이 'checkbox'일 때 사용) */
  checkboxLabel?: string
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
  /** 인풋 disabled 여부 */
  disabled?: boolean
  /** 왼쪽 영역(라벨)의 최소 너비 (px 또는 rem 단위) */
  labelMinWidth?: string
}

export interface LabelInputRowGroupProps {
  /** LabelInputRow 옵션 배열 */
  options: LabelInputRowOption[]
  /** 모든 라벨의 최소 너비 (px 또는 rem 단위, 개별 labelMinWidth보다 우선순위 낮음) */
  labelMinWidth?: string
  /** 텍스트 라벨 정렬: 'left' 또는 'center' (기본값: 'center', labelType이 'text'일 때만 적용) */
  textLabelAlign?: 'left' | 'center'
  /** 모든 인풋의 disabled 여부 (개별 disabled보다 우선순위 낮음) */
  disabled?: boolean
  /** 그룹 간격 */
  gap?: string
  /** 추가 className */
  className?: string
}

export const LabelInputRowGroup: React.FC<LabelInputRowGroupProps> = ({
  options,
  labelMinWidth,
  textLabelAlign = 'center',
  disabled,
  gap,
  className = ''
}) => {
  const groupStyle = gap ? { gap } : undefined

  return (
    <div className={`${styles.labelInputRowGroup} ${className}`} style={groupStyle}>
      {options.map(option => (
        <LabelInputRow
          key={option.inputId}
          labelType={option.labelType || 'text'}
          textLabel={option.textLabel}
          textLabelAlign={textLabelAlign}
          checkboxId={option.checkboxId}
          checkboxName={option.checkboxName}
          checked={option.checked}
          onCheckboxChange={option.onCheckboxChange}
          checkboxLabel={option.checkboxLabel}
          labelMinWidth={option.labelMinWidth || labelMinWidth}
          inputId={option.inputId}
          inputName={option.inputName}
          inputType={option.inputType}
          placeholder={option.placeholder}
          value={option.value}
          onInputChange={option.onInputChange}
          disabled={option.disabled !== undefined ? option.disabled : disabled}
        />
      ))}
    </div>
  )
}
