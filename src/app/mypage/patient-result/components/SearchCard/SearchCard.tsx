'use client'

import React, { useState } from 'react'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { Select } from '@/components/atoms/Select/Select'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import { CollapseUpIcon } from '@/components/icons/CollapseUpIcon'
import { CollapseDownIcon } from '@/components/icons/CollapseDownIcon'
import styles from '../../page.module.scss'

// 조회기간 옵션
const PERIOD_OPTIONS = [
  { value: '1month', label: '1개월' },
  { value: '3month', label: '3개월' },
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

export interface SearchParams {
  period: string
  startDate: string
  endDate: string
  category: string
  keyword: string
}

export interface SearchCardProps {
  onSearch?: (params: SearchParams) => void
}

export const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [period, setPeriod] = useState('1month')
  const [startDate, setStartDate] = useState('2025-04-21')
  const [endDate, setEndDate] = useState('2025-05-21')
  const [searchCategory, setSearchCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  const handleSearch = () => {
    onSearch?.({
      period,
      startDate,
      endDate,
      category: searchCategory,
      keyword: searchKeyword
    })
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
            <Radio name='period' options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />
            <div className={styles.dateRangeGroup}>
              <div className={styles.dateInput}>
                <input type='text' value={startDate} onChange={e => setStartDate(e.target.value)} readOnly />
                <CalendarIcon width={24} height={24} />
              </div>
              <span className={styles.dateSeparator}>~</span>
              <div className={styles.dateInput}>
                <input type='text' value={endDate} onChange={e => setEndDate(e.target.value)} readOnly />
                <CalendarIcon width={24} height={24} />
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
