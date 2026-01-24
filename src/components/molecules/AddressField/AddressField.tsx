import React from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import styles from './AddressField.module.scss'

export interface AddressFieldProps {
  /** 라벨 텍스트 */
  label: string
  /** 필수 여부 */
  required?: boolean
  /** 우편번호 Input의 id */
  zipCodeId: string
  /** 우편번호 Input의 name */
  zipCodeName: string
  /** 우편번호 Input의 value */
  zipCodeValue: string
  /** 우편번호 Input의 onChange 핸들러 */
  onZipCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** 우편번호 Input의 disabled 여부 */
  zipCodeDisabled?: boolean
  /** 우편번호 검색 버튼 텍스트 */
  searchButtonText?: string
  /** 우편번호 검색 버튼 onClick 핸들러 */
  onSearchClick?: () => void
  /** 우편번호 검색 버튼 아이콘 */
  searchButtonIcon?: React.ReactNode
  /** 주소 Input의 id */
  addressId: string
  /** 주소 Input의 name */
  addressName: string
  /** 주소 Input의 value */
  addressValue: string
  /** 주소 Input의 onChange 핸들러 */
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** 주소 Input의 disabled 여부 */
  addressDisabled?: boolean
  /** 상세주소 Input의 id */
  detailAddressId: string
  /** 상세주소 Input의 name */
  detailAddressName: string
  /** 상세주소 Input의 value */
  detailAddressValue: string
  /** 상세주소 Input의 onChange 핸들러 */
  onDetailAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** 상세주소 Input의 placeholder */
  detailAddressPlaceholder?: string
  /** 에러 메시지 */
  error?: string
  /** 우편번호 Input의 className */
  zipCodeClassName?: string
  /** 주소 Input의 className */
  addressClassName?: string
  /** 상세주소 Input의 className */
  detailAddressClassName?: string
  /** 검색 버튼의 className */
  searchButtonClassName?: string
}

export const AddressField: React.FC<AddressFieldProps> = ({
  label,
  required = false,
  zipCodeId,
  zipCodeName,
  zipCodeValue,
  onZipCodeChange,
  zipCodeDisabled = false,
  searchButtonText = '우편번호 검색',
  onSearchClick,
  searchButtonIcon,
  addressId,
  addressName,
  addressValue,
  onAddressChange,
  addressDisabled = false,
  detailAddressId,
  detailAddressName,
  detailAddressValue,
  onDetailAddressChange,
  detailAddressPlaceholder = '상세주소를 입력해 주세요.',
  error,
  zipCodeClassName,
  addressClassName,
  detailAddressClassName,
  searchButtonClassName
}) => {
  return (
    <div className={styles.addressField}>
      <InputLabel htmlFor={zipCodeId} required={required}>
        {label}
      </InputLabel>
      <div className={styles.addressInput}>
        <div className={styles.zipCodeInput}>
          <Input
            type='text'
            id={zipCodeId}
            name={zipCodeName}
            placeholder='우편번호'
            value={zipCodeValue}
            onChange={onZipCodeChange}
            disabled={zipCodeDisabled}
            error={error}
            className={`${styles.inputWithButtonInput} ${zipCodeClassName || ''}`}
          />
          {onSearchClick && (
            <Button
              type='button'
              variant='primary'
              size='small'
              onClick={onSearchClick}
              className={searchButtonClassName}
            >
              {searchButtonText}
              {searchButtonIcon}
            </Button>
          )}
        </div>
        <Input
          type='text'
          id={addressId}
          name={addressName}
          placeholder='주소'
          value={addressValue}
          onChange={onAddressChange}
          disabled={addressDisabled}
          error={error}
          className={addressClassName}
        />
        <Input
          type='text'
          id={detailAddressId}
          name={detailAddressName}
          placeholder={detailAddressPlaceholder}
          value={detailAddressValue}
          onChange={onDetailAddressChange}
          className={detailAddressClassName}
        />
      </div>
    </div>
  )
}
