import React from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import styles from './FormField.module.scss'

export interface FormFieldProps {
  /** 라벨 텍스트 */
  label?: string
  /** 필수 여부 */
  required?: boolean
  /** Input의 id */
  id: string
  /** Input의 name */
  name: string
  /** Input의 type */
  type?: string
  /** Input의 placeholder */
  placeholder?: string
  /** Input의 value */
  value: string
  /** Input의 onChange 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Input의 onKeyDown 핸들러 */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /** Input의 disabled 여부 */
  disabled?: boolean
  /** 에러 메시지 */
  error?: string
  /** 우측 버튼 텍스트 (없으면 버튼 미표시) */
  buttonText?: string
  /** 우측 버튼 onClick 핸들러 */
  onButtonClick?: () => void
  /** 우측 버튼 아이콘 (ReactNode) */
  buttonIcon?: React.ReactNode
  /** Input의 className */
  inputClassName?: string
  /** Button의 className */
  buttonClassName?: string
  /** 추가 설명 텍스트 */
  helperText?: string
  /** 우측 영역에 표시할 커스텀 컴포넌트 (버튼 대신 사용) */
  rightElement?: React.ReactNode
  /** 추가 컨텐츠 (Input 아래에 표시) */
  children?: React.ReactNode
  /** 모바일에서 Input과 Button을 2줄로 배치 (기본값: false) */
  mobileStack?: boolean
  /** 라벨 텍스트 뒤에 추가할 요소 (예: 유효성 상태 텍스트) */
  labelExtra?: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyDown,
  disabled = false,
  error,
  buttonText,
  onButtonClick,
  buttonIcon,
  inputClassName,
  buttonClassName,
  helperText,
  rightElement,
  children,
  mobileStack = false,
  labelExtra
}) => {
  const hasRightElement = buttonText || rightElement

  return (
    <div
      className={`${styles.formField} ${hasRightElement ? styles.formFieldWithButton : ''} ${mobileStack ? styles.mobileStack : ''}`}
    >
      {label && (
        <InputLabel htmlFor={id} required={required} extra={labelExtra}>
          {label}
        </InputLabel>
      )}
      {hasRightElement ? (
        <div className={styles.inputWithButton}>
          <Input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            error={error}
            className={`${styles.inputWithButtonInput} ${inputClassName || ''}`}
          />
          {rightElement ? (
            <div className={styles.rightElement}>{rightElement}</div>
          ) : buttonText ? (
            <Button
              type='button'
              variant='primary'
              size='small'
              onClick={onButtonClick}
              className={`${styles.formFieldButton} ${buttonClassName || ''}`}
            >
              {buttonText}
              {buttonIcon}
            </Button>
          ) : null}
        </div>
      ) : (
        <Input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          error={error}
          className={inputClassName}
        />
      )}
      {children && <div className={styles.additionalContent}>{children}</div>}
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  )
}
