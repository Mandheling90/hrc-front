'use client'

import React, { useEffect, useMemo } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { useVisitHistory, type VisitHistoryItem, type VisitHistoryQueryInput } from '@/hooks/useVisitHistory'
import { matchesKeyword, matchesDateRange, sortByDate, paginate, formatDateDisplay, type FilterSortProps } from '../../utils/filterSort'
import styles from '../../page.module.scss'

export interface HistoryTabProps extends FilterSortProps {
  hospitalCode: string
  ptntNo: string
  mcdpCd?: string
}

interface HistoryRow {
  id: string
  visitDate: string
  visitType: string
  department: string
  doctor: string
  diagnosis: string
}

function toHistoryRow(item: VisitHistoryItem, index: number): HistoryRow {
  return {
    id: `${item.visitDate}-${index}`,
    visitDate: formatDateDisplay(item.visitDate),
    visitType: item.visitTypeName ?? '-',
    department: item.departmentName ?? '-',
    doctor: item.doctorName ?? '-',
    diagnosis: item.diagnosisName ?? '-'
  }
}

const FIELD_MAP = {
  department: 'department' as const,
  doctor: 'doctor' as const,
  diagnosis: 'diagnosis' as const
}

const historyColumns: TableColumn<HistoryRow>[] = [
  { id: 'visitDate', label: '내원일', field: 'visitDate', width: '160px', align: 'center' },
  { id: 'visitType', label: '진료구분', field: 'visitType', width: '130px', align: 'center' },
  { id: 'department', label: '진료과', field: 'department', width: '1fr', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'diagnosis', label: '진단명', field: 'diagnosis', width: '550px', align: 'center' }
]

const renderHistoryTabletCard = (item: HistoryRow) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>내원일</span>
      <span className={styles.tabletCardHeaderValue}>{item.visitDate}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료구분</span>
        <span className={styles.tabletCardValue}>{item.visitType}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료과</span>
        <span className={styles.tabletCardValue}>{item.department}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료의</span>
        <span className={styles.tabletCardValue}>{item.doctor}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진단명</span>
        <span className={styles.tabletCardValue}>{item.diagnosis}</span>
      </div>
    </div>
  </div>
)

const renderHistoryMobileCard = (item: HistoryRow) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>내원일</span>
      <span className={styles.mobileCardHeaderValue}>{item.visitDate}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료구분</span>
        <span className={styles.mobileCardValue}>{item.visitType}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료과</span>
        <span className={styles.mobileCardValue}>{item.department}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료의</span>
        <span className={styles.mobileCardValue}>{item.doctor}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진단명</span>
        <span className={styles.mobileCardValue}>{item.diagnosis}</span>
      </div>
    </div>
  </div>
)

export const HistoryTab: React.FC<HistoryTabProps> = ({
  hospitalCode, ptntNo, mcdpCd,
  sortOrder, searchFilter, currentPage, pageSize, onTotalCountChange
}) => {
  const { searchVisitHistory, items, loading } = useVisitHistory()

  useEffect(() => {
    if (ptntNo) {
      const input: VisitHistoryQueryInput = { hospitalCode, ptntNo }
      if (mcdpCd) input.mcdpCd = mcdpCd
      searchVisitHistory(input)
    }
  }, [hospitalCode, ptntNo, mcdpCd, searchVisitHistory])

  const allRows = useMemo(() => items.map(toHistoryRow), [items])

  const filteredSorted = useMemo(() => {
    console.log('[HistoryTab] filtering:', { searchFilter, sortOrder, totalRows: allRows.length })
    let result = allRows.filter(row =>
      matchesKeyword(row, searchFilter, FIELD_MAP) && matchesDateRange(row.visitDate, searchFilter)
    )
    result = sortByDate(result, 'visitDate', sortOrder)
    console.log('[HistoryTab] filtered result:', result.length, 'rows', result.slice(0, 3).map(r => ({ visitDate: r.visitDate, department: r.department })))
    return result
  }, [allRows, searchFilter, sortOrder])

  useEffect(() => {
    onTotalCountChange(filteredSorted.length)
  }, [filteredSorted.length, onTotalCountChange])

  const pagedRows = useMemo(() => paginate(filteredSorted, currentPage, pageSize), [filteredSorted, currentPage, pageSize])

  if (loading) {
    return <Skeleton width='100%' height={44} variant='rounded' count={5} gap={4} />
  }

  if (filteredSorted.length === 0) {
    return <div className={styles.emptyState}>수진 이력이 없습니다.</div>
  }

  return (
    <Table
      columns={historyColumns}
      data={pagedRows}
      getRowKey={item => item.id}
      renderTabletCard={renderHistoryTabletCard}
      renderMobileCard={renderHistoryMobileCard}
    />
  )
}
