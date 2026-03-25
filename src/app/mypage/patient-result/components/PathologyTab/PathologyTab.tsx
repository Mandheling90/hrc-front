'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import { useSpecialExamResults, type SpecialExamResultItem } from '@/hooks/useExamResults'
import type { ExamSlipQueryInput } from '@/hooks/useExamResults'
import { matchesKeyword, matchesDateRange, sortByDate, paginate, formatDateDisplay, type FilterSortProps } from '../../utils/filterSort'
import styles from '../../page.module.scss'

export interface PathologyTabProps extends FilterSortProps {
  hospitalCode: string
  ptntNo: string
  slipCd?: string
  mcdpCd?: string
}

interface PathologyRow {
  id: string
  department: string
  examDate: string
  examName: string
  _raw: SpecialExamResultItem
}

function toRow(item: SpecialExamResultItem, index: number): PathologyRow {
  return {
    id: `${item.orderCode}-${index}`,
    department: item.departmentName ?? '-',
    examDate: formatDateDisplay(item.examDate),
    examName: item.orderName ?? '-',
    _raw: item
  }
}

const FIELD_MAP = {
  department: 'department' as const,
  doctor: 'department' as const,
  diagnosis: 'examName' as const
}

const getPathologyColumns = (onViewClick: (item: PathologyRow) => void): TableColumn<PathologyRow>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '250px', align: 'center' },
  { id: 'examDate', label: '검사일', field: 'examDate', width: '180px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'result',
    label: '판독결과',
    width: '200px',
    align: 'center',
    renderCell: (item: PathologyRow) => (
      <button type='button' className={styles.viewButton} onClick={() => onViewClick(item)}>
        조회
      </button>
    )
  }
]

const getPathologyTabletCard = (onViewClick: (item: PathologyRow) => void) => (item: PathologyRow) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>진료과</span>
      <span className={styles.tabletCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사일</span>
        <span className={styles.tabletCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사명</span>
        <span className={styles.tabletCardValue}>{item.examName}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>판독결과</span>
        <button type='button' className={styles.viewButton} onClick={() => onViewClick(item)}>
          조회
        </button>
      </div>
    </div>
  </div>
)

const getPathologyMobileCard = (onViewClick: (item: PathologyRow) => void) => (item: PathologyRow) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>진료과</span>
      <span className={styles.mobileCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사일</span>
        <span className={styles.mobileCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사명</span>
        <span className={styles.mobileCardValue}>{item.examName}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>판독결과</span>
        <button type='button' className={styles.viewButton} onClick={() => onViewClick(item)}>
          조회
        </button>
      </div>
    </div>
  </div>
)

export const PathologyTab: React.FC<PathologyTabProps> = ({
  hospitalCode, ptntNo, slipCd = 'L08', mcdpCd,
  sortOrder, searchFilter, currentPage, pageSize, onTotalCountChange
}) => {
  const { searchSpecialExamResults, items, loading } = useSpecialExamResults()
  const [isPathologyModalOpen, setIsPathologyModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<PathologyRow | null>(null)

  useEffect(() => {
    if (ptntNo) {
      const input: ExamSlipQueryInput = { hospitalCode, ptntNo, slipCd }
      if (mcdpCd) input.mcdpCd = mcdpCd
      searchSpecialExamResults(input)
    }
  }, [hospitalCode, ptntNo, slipCd, mcdpCd, searchSpecialExamResults])

  const allRows = useMemo(() => items.map(toRow), [items])

  const filteredSorted = useMemo(() => {
    let result = allRows.filter(row =>
      matchesKeyword(row, searchFilter, FIELD_MAP) &&
      matchesDateRange(row.examDate, searchFilter)
    )
    result = sortByDate(result, 'examDate', sortOrder)
    return result
  }, [allRows, searchFilter, sortOrder])

  useEffect(() => {
    onTotalCountChange(filteredSorted.length)
  }, [filteredSorted.length, onTotalCountChange])

  const pagedRows = useMemo(() => paginate(filteredSorted, currentPage, pageSize), [filteredSorted, currentPage, pageSize])

  const handleViewPathologyResult = (item: PathologyRow) => {
    setSelectedRow(item)
    setIsPathologyModalOpen(true)
  }

  const handleClosePathologyModal = () => {
    setIsPathologyModalOpen(false)
    setSelectedRow(null)
  }

  if (loading) {
    return <Skeleton width='100%' height={44} variant='rounded' count={5} gap={4} />
  }

  if (filteredSorted.length === 0) {
    return <div className={styles.emptyState}>병리검사 결과가 없습니다.</div>
  }

  return (
    <>
      <Table
        columns={getPathologyColumns(handleViewPathologyResult)}
        data={pagedRows}
        getRowKey={item => item.id}
        renderTabletCard={getPathologyTabletCard(handleViewPathologyResult)}
        renderMobileCard={getPathologyMobileCard(handleViewPathologyResult)}
      />

      {selectedRow && (
        <PathologyResultModal
          isOpen={isPathologyModalOpen}
          onClose={handleClosePathologyModal}
          examName={selectedRow.examName}
          result={selectedRow._raw.resultContent || selectedRow._raw.grossResult || ''}
        />
      )}
    </>
  )
}
