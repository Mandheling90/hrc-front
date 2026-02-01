import React from 'react'
import { Select } from '@/components/atoms/Select/Select'
import { Input } from '@/components/atoms/Input/Input'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import styles from './SearchFilterWithInfo.module.scss'
import { InfoNote } from '../InfoNote/InfoNote'

interface Option {
  value: string
  label: string
}

export interface SearchFilterWithInfoProps {
  /** 셀렉트 옵션 (없으면 셀렉트 영역 숨김) */
  selectOptions?: Option[]
  selectValue?: string
  onSelectChange?: (value: string) => void
  selectWidth?: number

  searchPlaceholder: string
  searchValue: string
  onSearchValueChange: (value: string) => void
  onSearch: () => void

  /** 검색 필드 기본 너비 (기본: 400px) */
  searchFieldWidth?: number | string

  /** 안내 메시지 (없으면 안내 영역 숨김) */
  infoMessage?: string

  className?: string
}

export const SearchFilterWithInfo: React.FC<SearchFilterWithInfoProps> = ({
  selectOptions,
  selectValue,
  onSelectChange,
  selectWidth = 180,
  searchPlaceholder,
  searchValue,
  onSearchValueChange,
  onSearch,
  searchFieldWidth = 400,
  infoMessage,
  className = ''
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const hasInfo = !!infoMessage

  return (
    <div className={`${styles.infoAndSearchSection} ${!hasInfo ? styles.onlySearch : ''} ${className}`}>
      <div className={styles.searchSection}>
        {selectOptions && selectOptions.length > 0 && selectValue !== undefined && onSelectChange && (
          <Select
            options={selectOptions}
            value={selectValue}
            onChange={onSelectChange}
            width={selectWidth}
            className={styles.statusSelect}
          />
        )}
        <div
          className={styles.searchField}
          style={{ width: typeof searchFieldWidth === 'number' ? `${searchFieldWidth}px` : searchFieldWidth }}
        >
          <Input
            id='search'
            name='search'
            type='text'
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={e => onSearchValueChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
          <button type='button' onClick={onSearch} className={styles.searchButton} aria-label='검색'>
            <SearchIcon width={24} height={24} />
          </button>
        </div>
      </div>

      {hasInfo && <InfoNote message={infoMessage} />}
    </div>
  )
}
