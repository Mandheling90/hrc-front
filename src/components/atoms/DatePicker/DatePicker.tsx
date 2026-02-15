'use client'

import React from 'react'
import { DatePicker as AntDatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import styles from './DatePicker.module.scss'

dayjs.locale('ko')

export interface DatePickerProps {
  id?: string
  name?: string
  /** 'YYYY-MM-DD' 또는 'YYYY' 형식 문자열 */
  value?: string
  /** 문자열로 반환 (기존 상태 호환) */
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  /** 연도만 선택 (졸업년도용) */
  showYearPicker?: boolean
  maxDate?: Date
  minDate?: Date
  className?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  value,
  onChange,
  placeholder,
  disabled = false,
  showYearPicker = false,
  maxDate,
  minDate,
  className = ''
}) => {
  const parseValue = (val?: string): Dayjs | null => {
    if (!val) return null
    if (showYearPicker && /^\d{4}$/.test(val)) {
      return dayjs(val, 'YYYY')
    }
    const parsed = dayjs(val)
    return parsed.isValid() ? parsed : null
  }

  const handleChange = (_date: Dayjs | null, dateString: string | null) => {
    if (!onChange) return
    onChange(dateString ?? '')
  }

  const disabledDate = (current: Dayjs): boolean => {
    if (!current) return false
    if (maxDate && current.isAfter(dayjs(maxDate), 'day')) return true
    if (minDate && current.isBefore(dayjs(minDate), 'day')) return true
    return false
  }

  const suffixIcon = (
    <CalendarIcon width={24} height={24} stroke='var(--gray-11)' />
  )

  if (showYearPicker) {
    return (
      <AntDatePicker
        id={id}
        picker='year'
        value={parseValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        disabledDate={disabledDate}
        suffixIcon={suffixIcon}
        allowClear={false}
        className={`${styles.datePicker} ${className}`}
        popupClassName={styles.popup}
      />
    )
  }

  return (
    <AntDatePicker
      id={id}
      value={parseValue(value)}
      onChange={handleChange}
      format='YYYY-MM-DD'
      placeholder={placeholder}
      disabled={disabled}
      disabledDate={disabledDate}
      suffixIcon={suffixIcon}
      allowClear={false}
      className={`${styles.datePicker} ${className}`}
      popupClassName={styles.popup}
    />
  )
}

DatePicker.displayName = 'DatePicker'
