'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { DiagnosticDetailModal, DiagnosticResultItem } from '@/components/organisms/DiagnosticDetailModal'
import { useExamSlips, useExamResults, type ExamSlipItem, type ExamResultItem } from '@/hooks/useExamResults'
import { matchesKeyword, matchesDateRange, sortByDate, paginate, formatDateDisplay, type FilterSortProps } from '../../utils/filterSort'
import styles from '../../page.module.scss'

export interface DiagnosticTabProps extends FilterSortProps {
  hospitalCode: string
  ptntNo: string
  mcdpCd?: string
}

interface DiagnosticRow {
  id: string
  department: string
  treatmentDate: string
  examDate: string
  examName: string
  _raw: ExamSlipItem
}

function toRow(item: ExamSlipItem, index: number): DiagnosticRow {
  return {
    id: `${item.examCode}-${index}`,
    department: item.departmentName ?? '-',
    treatmentDate: formatDateDisplay(item.treatmentDate),
    examDate: formatDateDisplay(item.enforceDatetime ?? item.treatmentDate),
    examName: item.slipName ?? '-',
    _raw: item
  }
}

function toDetailItems(items: ExamResultItem[]): { results: DiagnosticResultItem[] } {
  const results: DiagnosticResultItem[] = items.map((item, i) => ({
    id: i + 1,
    testName: item.orderName ?? '-',
    result: item.resultContent ? parseFloat(item.resultContent) || item.resultContent : '-',
    min: item.normalLowerLimit ? parseFloat(item.normalLowerLimit) || item.normalLowerLimit : '-',
    max: item.normalUpperLimit ? parseFloat(item.normalUpperLimit) || item.normalUpperLimit : '-',
    isHigh: item.normalUpperLimit && item.resultContent ? parseFloat(item.resultContent) > parseFloat(item.normalUpperLimit) : false,
    isLow: item.normalLowerLimit && item.resultContent ? parseFloat(item.resultContent) < parseFloat(item.normalLowerLimit) : false,
    remark: item.resultRemark || undefined
  }))
  return { results }
}

const FIELD_MAP = {
  department: 'department' as const,
  doctor: 'department' as const, // 진단검사는 doctor 필드 없으므로 department로 fallback
  diagnosis: 'examName' as const
}

const getDiagnosticColumns = (onDetailClick: (item: DiagnosticRow) => void): TableColumn<DiagnosticRow>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '1fr', align: 'center' },
  { id: 'treatmentDate', label: '진료일', field: 'treatmentDate', width: '180px', align: 'center' },
  { id: 'examDate', label: '검사일', field: 'examDate', width: '180px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'result',
    label: '검사결과',
    width: '200px',
    align: 'center',
    renderCell: (item: DiagnosticRow) => (
      <button type='button' className={styles.detailButton} onClick={() => onDetailClick(item)}>
        상세 내역 보기
      </button>
    )
  }
]

const getDiagnosticTabletCard = (onDetailClick: (item: DiagnosticRow) => void) => (item: DiagnosticRow) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>진료과</span>
      <span className={styles.tabletCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료일</span>
        <span className={styles.tabletCardValue}>{item.treatmentDate}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사일</span>
        <span className={styles.tabletCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사명</span>
        <span className={styles.tabletCardValue}>{item.examName}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>상세내역</span>
        <button type='button' className={styles.detailButton} onClick={() => onDetailClick(item)}>
          상세 내역 보기
        </button>
      </div>
    </div>
  </div>
)

const getDiagnosticMobileCard = (onDetailClick: (item: DiagnosticRow) => void) => (item: DiagnosticRow) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>진료과</span>
      <span className={styles.mobileCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료일</span>
        <span className={styles.mobileCardValue}>{item.treatmentDate}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사일</span>
        <span className={styles.mobileCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사명</span>
        <span className={styles.mobileCardValue}>{item.examName}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>상세내역</span>
        <button type='button' className={styles.detailButton} onClick={() => onDetailClick(item)}>
          상세 내역 보기
        </button>
      </div>
    </div>
  </div>
)

export const DiagnosticTab: React.FC<DiagnosticTabProps> = ({
  hospitalCode, ptntNo, mcdpCd,
  sortOrder, searchFilter, currentPage, pageSize, onTotalCountChange
}) => {
  const { searchExamSlips, items: slipItems, loading: slipLoading } = useExamSlips()
  const { searchExamResults, items: resultItems, loading: resultLoading } = useExamResults()

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<DiagnosticRow | null>(null)

  useEffect(() => {
    if (ptntNo) {
      const input: { hospitalCode: string; ptntNo: string; slipCd: string; mcdpCd?: string } = {
        hospitalCode,
        ptntNo,
        slipCd: 'L'
      }
      if (mcdpCd) input.mcdpCd = mcdpCd
      searchExamSlips(input)
    }
  }, [hospitalCode, ptntNo, mcdpCd, searchExamSlips])

  const allRows = useMemo(() => slipItems.map(toRow), [slipItems])

  const filteredSorted = useMemo(() => {
    console.log('[DiagnosticTab] filtering:', { searchFilter, sortOrder, totalRows: allRows.length })
    let result = allRows.filter(row =>
      matchesKeyword(row, searchFilter, FIELD_MAP) &&
      matchesDateRange(row.examDate, searchFilter)
    )
    result = sortByDate(result, 'examDate', sortOrder)
    console.log('[DiagnosticTab] filtered result:', result.length, 'rows', result.slice(0, 3).map(r => ({ examDate: r.examDate, department: r.department })))
    return result
  }, [allRows, searchFilter, sortOrder])

  useEffect(() => {
    onTotalCountChange(filteredSorted.length)
  }, [filteredSorted.length, onTotalCountChange])

  const pagedRows = useMemo(() => paginate(filteredSorted, currentPage, pageSize), [filteredSorted, currentPage, pageSize])

  const handleOpenDetailModal = async (item: DiagnosticRow) => {
    setSelectedRow(item)
    setIsDetailModalOpen(true)
    const date = item._raw.enforceDatetime?.replace(/\D/g, '').slice(0, 8) || ''
    if (date) {
      await searchExamResults({
        hospitalCode,
        ptntNo,
        date,
        slipCd: item._raw.slipCode || 'L'
      })
    }
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedRow(null)
  }

  const detailData = useMemo(() => {
    if (!selectedRow) return { results: [] }
    return toDetailItems(resultItems)
  }, [selectedRow, resultItems])

  if (slipLoading) {
    return <div className={styles.emptyState}>데이터를 불러오는 중입니다...</div>
  }

  if (filteredSorted.length === 0) {
    return <div className={styles.emptyState}>진단검사 결과가 없습니다.</div>
  }

  return (
    <>
      <Table
        columns={getDiagnosticColumns(handleOpenDetailModal)}
        data={pagedRows}
        getRowKey={item => item.id}
        renderTabletCard={getDiagnosticTabletCard(handleOpenDetailModal)}
        renderMobileCard={getDiagnosticMobileCard(handleOpenDetailModal)}
      />

      {selectedRow && (
        <DiagnosticDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          examName={selectedRow.examName}
          results={detailData.results}
          loading={resultLoading}
        />
      )}
    </>
  )
}
