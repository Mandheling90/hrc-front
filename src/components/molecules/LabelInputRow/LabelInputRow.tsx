import React from 'react'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Input } from '@/components/atoms/Input/Input'
import styles from './LabelInputRow.module.scss'

export interface LabelInputRowProps {
  /** 라벨 타입: 'checkbox' 또는 'text' */
  labelType?: 'checkbox' | 'text'
  /** 텍스트 라벨 (labelType이 'text'일 때 사용) */
  textLabel?: string
  /** 텍스트 라벨 정렬: 'left' 또는 'center' (기본값: 'center') */
  textLabelAlign?: 'left' | 'center'
  /** 왼쪽 영역(라벨)의 최소 너비 (px 또는 rem 단위, 예: "124px") */
  labelMinWidth?: string
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
  /** 추가 className */
  className?: string
}

export const LabelInputRow: React.FC<LabelInputRowProps> = ({
  labelType = 'checkbox',
  textLabel,
  textLabelAlign = 'center',
  labelMinWidth,
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
  // 그리드 템플릿 컬럼 계산 (왼쪽 영역 최소 넓이 사용)
  const getGridTemplateColumns = () => {
    // labelMinWidth가 있으면 최소 넓이만큼만 차지하고 나머지는 input이 차지
    // 없으면 기본값 사용
    if (labelMinWidth) {
      return `minmax(${labelMinWidth}, auto) 1fr`
    }
    return undefined // 기본값 사용
  }

  const gridStyle = getGridTemplateColumns() ? { gridTemplateColumns: getGridTemplateColumns() } : undefined

  return (
    <div
      className={`${styles.labelInputRow} ${labelType === 'text' ? styles.textLabelRow : ''} ${
        textLabelAlign === 'left' ? styles.textLabelLeft : ''
      } ${className}`}
      style={gridStyle}
    >
      {labelType === 'checkbox' ? (
        <Checkbox
          id={checkboxId}
          name={checkboxName}
          checked={checked || false}
          onChange={onCheckboxChange || (() => {})}
          label={checkboxLabel}
          disabled={disabled}
        />
      ) : (
        <label className={styles.textLabel} htmlFor={inputId}>
          {textLabel}
        </label>
      )}
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
