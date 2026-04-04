'use client'

import React, { useState, useMemo } from 'react'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { Select } from '@/components/atoms/Select/Select'
import { DatePicker } from '@/components/atoms/DatePicker/DatePicker'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CollapseUpIcon } from '@/components/icons/CollapseUpIcon'
import { CollapseDownIcon } from '@/components/icons/CollapseDownIcon'
import styles from '../../page.module.scss'

// 조회기간 옵션
const PERIOD_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: '1month', label: '1개월' },
  { value: '6month', label: '6개월' },
  { value: '1year', label: '1년' }
]

// 검색 카테고리 옵션
const SEARCH_CATEGORY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'department', label: '진료과' },
  { value: 'doctor', label: '진료의' },
  { value: 'diagnosis', label: '진단명' }
]

export interface SearchFilter {
  keyword: string
  category: string
  startDate: string
  endDate: string
}

export interface SearchCardProps {
  onSearch?: (filter: SearchFilter) => void
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function calcStartDate(period: string, end: string): string {
  const d = new Date(end)
  switch (period) {
    case '1month': d.setMonth(d.getMonth() - 1); break
    case '6month': d.setMonth(d.getMonth() - 6); break
    case '1year': d.setFullYear(d.getFullYear() - 1); break
  }
  return formatDate(d)
}

export const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [period, setPeriod] = useState('all')
  const [endDate, setEndDate] = useState(formatDate(new Date()))
  const [manualStartDate, setManualStartDate] = useState<string | null>(null)
  const [manualEndDate, setManualEndDate] = useState<string | null>(null)

  const [searchCategory, setSearchCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  // period/endDate에서 계산된 시작일 (수동 입력이 없으면 자동 계산)
  const startDate = useMemo(() => {
    if (period === 'all') return manualStartDate ?? ''
    if (manualStartDate !== null) return manualStartDate
    return calcStartDate(period, endDate)
  }, [period, endDate, manualStartDate])

  const displayEndDate = useMemo(() => {
    if (period === 'all') return manualEndDate ?? ''
    return endDate
  }, [period, endDate, manualEndDate])

  // 기간 라디오 변경 시 수동 날짜 초기화
  const handlePeriodChange = (value: string) => {
    setPeriod(value)
    setManualStartDate(null)
    setManualEndDate(null)
    if (value !== 'all') {
      setEndDate(formatDate(new Date()))
    }
  }

  const handleStartDateChange = (val: string) => {
    setManualStartDate(val)
  }

  const handleEndDateChange = (val: string) => {
    if (period === 'all') {
      setManualEndDate(val)
    } else {
      setEndDate(val)
    }
  }

  const handleSearch = () => {
    const filter = {
      keyword: searchKeyword,
      category: searchCategory,
      startDate,
      endDate: displayEndDate
    }
    console.log('[SearchCard] handleSearch filter:', filter)
    onSearch?.(filter)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={`${styles.searchCard} ${isOpen ? styles.open : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.searchCardTitleWrapper}>
          <div className={styles.cardTitleRow}>
            <h2 className={styles.searchCardTitle}>검색/조회</h2>
            <button
              type='button'
              className={styles.toggleButton}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? '접기' : '펼치기'}
            >
              {isOpen ? <CollapseUpIcon /> : <CollapseDownIcon />}
            </button>
          </div>
          <p className={styles.searchCardSubtitle}>의뢰하신 날짜를 기준으로 1년 동안 조회가 가능합니다.</p>
        </div>
        <div className={styles.cardDivider} />
      </div>

      <div className={styles.searchContent}>
        {/* 조회기간 */}
        <div className={styles.searchField}>
          <span className={styles.fieldLabel}>조회기간</span>
          <div className={styles.periodWrapper}>
            <Radio
              name='period'
              options={PERIOD_OPTIONS}
              value={period}
              onChange={handlePeriodChange}
              className={styles.searchPeriodRadio}
            />
            <div className={styles.dateRangeGroup}>
              <div className={styles.dateInputWrapper}>
                <DatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                  maxDate={displayEndDate ? new Date(displayEndDate) : undefined}
                />
              </div>
              <span className={styles.dateSeparator}>~</span>
              <div className={styles.dateInputWrapper}>
                <DatePicker
                  value={displayEndDate}
                  onChange={handleEndDateChange}
                  minDate={startDate ? new Date(startDate) : undefined}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 상세검색 */}
        <div className={styles.searchField}>
          <span className={styles.fieldLabel}>상세검색</span>
          <div className={styles.searchInputWrapper}>
            <Select
              options={SEARCH_CATEGORY_OPTIONS}
              value={searchCategory}
              onChange={setSearchCategory}
              className={styles.searchCategorySelect}
            />
            <Input
              placeholder='진료과, 진료의, 진단명으로 검색하세요.'
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant='primary' onClick={handleSearch}>
              검색
              <SearchIcon width={22} height={22} fill='white' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
