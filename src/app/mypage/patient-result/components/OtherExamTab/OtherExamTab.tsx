'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import { useSpecialExamResults, type SpecialExamResultItem, type ExamSlipQueryInput } from '@/hooks/useExamResults'
import { matchesKeyword, matchesDateRange, sortByDate, paginate, formatDateDisplay, type FilterSortProps } from '../../utils/filterSort'
import styles from '../../page.module.scss'

export interface OtherExamTabProps extends FilterSortProps {
  hospitalCode: string
  ptntNo: string
  slipCd?: string
  mcdpCd?: string
}

type ImageStatus = 'request' | 'view'

interface OtherExamRow {
  id: string
  department: string
  doctor: string
  examName: string
  examDate: string
  imageStatus: ImageStatus
  _raw: SpecialExamResultItem
}

function getImageStatus(item: SpecialExamResultItem): ImageStatus {
  return item.pacsAccessNo ? 'view' : 'request'
}

function toRow(item: SpecialExamResultItem, index: number): OtherExamRow {
  return {
    id: `${item.orderCode}-${index}`,
    department: item.departmentName ?? '-',
    doctor: item.doctorName ?? '-',
    examName: item.orderName ?? '-',
    examDate: formatDateDisplay(item.examDate ?? item.orderDate),
    imageStatus: getImageStatus(item),
    _raw: item
  }
}

const FIELD_MAP = {
  department: 'department' as const,
  doctor: 'doctor' as const,
  diagnosis: 'examName' as const
}

const renderImageButton = (item: OtherExamRow) => {
  if (item.imageStatus === 'view') {
    return (
      <button type='button' className={styles.viewButton} disabled>
        보기
      </button>
    )
  }
  return (
    <button type='button' className={styles.requestButton} disabled>
      신청
    </button>
  )
}

const getOtherExamColumns = (
  onViewResultClick: (item: OtherExamRow) => void
): TableColumn<OtherExamRow>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '160px', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'image',
    label: '이미지',
    width: '130px',
    align: 'center',
    renderCell: renderImageButton
  },
  {
    id: 'result',
    label: '판독결과',
    width: '130px',
    align: 'center',
    renderCell: (item: OtherExamRow) => (
      <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
        보기
      </button>
    )
  }
]

const getOtherExamTabletCard =
  (onViewResultClick: (item: OtherExamRow) => void) =>
  (item: OtherExamRow) => (
    <div className={styles.tabletCard}>
      <div className={styles.tabletCardHeader}>
        <span className={styles.tabletCardHeaderLabel}>진료과</span>
        <span className={styles.tabletCardHeaderValue}>{item.department}</span>
      </div>
      <div className={styles.tabletCardBody}>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>진료의</span>
          <span className={styles.tabletCardValue}>{item.doctor}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>검사명</span>
          <span className={styles.tabletCardValue}>{item.examName}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>이미지</span>
          {renderImageButton(item)}
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>판독결과</span>
          <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
            보기
          </button>
        </div>
      </div>
    </div>
  )

const getOtherExamMobileCard =
  (onViewResultClick: (item: OtherExamRow) => void) =>
  (item: OtherExamRow) => (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardHeader}>
        <span className={styles.mobileCardHeaderLabel}>진료과</span>
        <span className={styles.mobileCardHeaderValue}>{item.department}</span>
      </div>
      <div className={styles.mobileCardBody}>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>진료의</span>
          <span className={styles.mobileCardValue}>{item.doctor}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>검사명</span>
          <span className={styles.mobileCardValue}>{item.examName}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>이미지</span>
          {renderImageButton(item)}
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>판독결과</span>
          <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
            보기
          </button>
        </div>
      </div>
    </div>
  )

export const OtherExamTab: React.FC<OtherExamTabProps> = ({
  hospitalCode, ptntNo, slipCd = 'L10', mcdpCd,
  sortOrder, searchFilter, currentPage, pageSize, onTotalCountChange
}) => {
  const { searchSpecialExamResults, items, loading } = useSpecialExamResults()
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<OtherExamRow | null>(null)

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

  const handleViewResultClick = (item: OtherExamRow) => {
    setSelectedRow(item)
    setIsResultModalOpen(true)
  }

  const handleCloseResultModal = () => {
    setIsResultModalOpen(false)
    setSelectedRow(null)
  }

  if (loading) {
    return <Skeleton width='100%' height={44} variant='rounded' count={5} gap={4} />
  }

  if (filteredSorted.length === 0) {
    return <div className={styles.emptyState}>기타검사 결과가 없습니다.</div>
  }

  return (
    <>
      <Table
        columns={getOtherExamColumns(handleViewResultClick)}
        data={pagedRows}
        getRowKey={item => item.id}
        renderTabletCard={getOtherExamTabletCard(handleViewResultClick)}
        renderMobileCard={getOtherExamMobileCard(handleViewResultClick)}
      />

      {selectedRow && (
        <PathologyResultModal
          isOpen={isResultModalOpen}
          onClose={handleCloseResultModal}
          examName={selectedRow.examName}
          result={selectedRow._raw.resultContent || selectedRow._raw.grossResult || ''}
        />
      )}
    </>
  )
}
