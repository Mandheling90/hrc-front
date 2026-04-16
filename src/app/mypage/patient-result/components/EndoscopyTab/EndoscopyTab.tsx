'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import { ImageViewerModal } from '@/components/organisms/ImageViewerModal'
import { useSpecialExamResults, type SpecialExamResultItem, type ExamSlipQueryInput } from '@/hooks/useExamResults'
import { useImagingOverlay, useRequestImagingExam, usePresignedImageUrls, type ImagingDisplayState, type ImagingOverlayResult } from '@/hooks/useImagingRequest'
import { matchesKeyword, matchesDateRange, sortByDate, paginate, formatDateDisplay, type FilterSortProps } from '../../utils/filterSort'
import styles from '../../page.module.scss'

export interface EndoscopyTabProps extends FilterSortProps {
  hospitalCode: string
  ptntNo: string
  slipCd?: string
  mcdpCd?: string
}

interface EndoscopyRow {
  id: string
  department: string
  doctor: string
  examName: string
  examDate: string
  displayState: ImagingDisplayState | null
  _raw: SpecialExamResultItem
}

function toRow(item: SpecialExamResultItem, index: number): EndoscopyRow {
  return {
    id: `${item.orderCode}-${index}`,
    department: item.departmentName ?? '-',
    doctor: item.doctorName ?? '-',
    examName: item.orderName ?? '-',
    examDate: formatDateDisplay(item.examDate ?? item.orderDate),
    displayState: null,
    _raw: item
  }
}

const FIELD_MAP = {
  department: 'department' as const,
  doctor: 'doctor' as const,
  diagnosis: 'examName' as const
}

const DISPLAY_LABELS: Record<ImagingDisplayState, string> = {
  REQUESTABLE: '신청',
  PENDING_IMAGE: '접수',
  VIEWABLE: '보기',
  REJECTED: '반려',
  EXPIRED: '만료'
}

export const EndoscopyTab: React.FC<EndoscopyTabProps> = ({
  hospitalCode, ptntNo, slipCd = 'G05', mcdpCd,
  sortOrder, searchFilter, currentPage, pageSize, onTotalCountChange
}) => {
  const { searchSpecialExamResults, items, loading } = useSpecialExamResults()
  const { fetchOverlay } = useImagingOverlay()
  const { requestImagingExam, loading: requesting } = useRequestImagingExam()
  const { fetchPresignedUrls } = usePresignedImageUrls()
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<EndoscopyRow | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [overlayMap, setOverlayMap] = useState<Record<string, ImagingOverlayResult | null>>({})

  useEffect(() => {
    if (ptntNo) {
      const input: ExamSlipQueryInput = { hospitalCode, ptntNo, slipCd }
      if (mcdpCd) input.mcdpCd = mcdpCd
      searchSpecialExamResults(input)
    }
  }, [hospitalCode, ptntNo, slipCd, mcdpCd, searchSpecialExamResults])

  useEffect(() => {
    if (items.length === 0) return
    let cancelled = false
    const fetchAll = async () => {
      const BATCH_SIZE = 5
      const entries: [string, ImagingOverlayResult | null][] = []
      for (let i = 0; i < items.length; i += BATCH_SIZE) {
        if (cancelled) return
        const batch = items.slice(i, i + BATCH_SIZE)
        const batchResults = await Promise.all(
          batch.map(async (item, batchIndex) => {
            const index = i + batchIndex
            const key = `${item.orderCode}-${index}`
            try {
              const result = await fetchOverlay({
                ptntNo,
                examDate: item.examDate ?? item.orderDate ?? '',
                orderCode: item.orderCode ?? '',
                pacsAccessNo: item.pacsAccessNo
              })
              return [key, result] as [string, ImagingOverlayResult | null]
            } catch {
              return [key, null] as [string, ImagingOverlayResult | null]
            }
          })
        )
        entries.push(...batchResults)
        if (!cancelled) {
          setOverlayMap(Object.fromEntries(entries))
        }
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [items, ptntNo, fetchOverlay])

  const allRows = useMemo(() =>
    items.map((item, i) => {
      const row = toRow(item, i)
      const overlay = overlayMap[row.id]
      row.displayState = overlay?.displayState ?? 'REQUESTABLE'
      return row
    }),
    [items, overlayMap]
  )

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

  const handleRequest = useCallback(async (item: EndoscopyRow) => {
    if (requesting) return
    try {
      const result = await requestImagingExam({
        hospitalCode,
        ptntNo,
        examDate: item._raw.examDate ?? item._raw.orderDate ?? '',
        orderCode: item._raw.orderCode ?? '',
        examType: 'ENDOSCOPY',
        pacsAccessNo: item._raw.pacsAccessNo
      })
      if (result) {
        setOverlayMap(prev => ({ ...prev, [item.id]: result }))
      }
    } catch (err: any) {
      const message = err?.graphQLErrors?.[0]?.message || '영상검사 신청 중 오류가 발생했습니다.'
      alert(message)
    }
  }, [hospitalCode, ptntNo, requesting, requestImagingExam])

  const handleViewImage = useCallback(async (item: EndoscopyRow) => {
    const overlay = overlayMap[item.id]
    const attachments = overlay?.attachments ?? []
    if (attachments.length === 0) return
    const urls = await fetchPresignedUrls(attachments)
    setImageUrls(urls)
    setSelectedRow(item)
    setIsImageModalOpen(true)
  }, [overlayMap, fetchPresignedUrls])

  const renderImageButton = useCallback((item: EndoscopyRow) => {
    const state = item.displayState
    if (!state) return <span className={styles.statusText}>-</span>
    switch (state) {
      case 'REQUESTABLE':
        return (
          <button type='button' className={styles.requestButton} onClick={() => handleRequest(item)} disabled={requesting}>
            {DISPLAY_LABELS.REQUESTABLE}
          </button>
        )
      case 'VIEWABLE':
        return (
          <button type='button' className={styles.viewButton} onClick={() => handleViewImage(item)}>
            {DISPLAY_LABELS.VIEWABLE}
          </button>
        )
      case 'PENDING_IMAGE':
        return (
          <button type='button' className={styles.receivedButton}>
            {DISPLAY_LABELS.PENDING_IMAGE}
          </button>
        )
      case 'REJECTED':
        return (
          <button type='button' className={styles.requestButton} onClick={() => handleRequest(item)} disabled={requesting}>
            {DISPLAY_LABELS.REQUESTABLE}
          </button>
        )
      case 'EXPIRED':
        return <span className={styles.statusText}>{DISPLAY_LABELS.EXPIRED}</span>
    }
  }, [handleRequest, handleViewImage, requesting])

  const handleViewResultClick = (item: EndoscopyRow) => {
    setSelectedRow(item)
    setIsResultModalOpen(true)
  }

  const handleCloseResultModal = () => {
    setIsResultModalOpen(false)
    setSelectedRow(null)
  }

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedRow(null)
    setImageUrls([])
  }

  const endoscopyColumns: TableColumn<EndoscopyRow>[] = useMemo(() => [
    { id: 'department', label: '진료과', field: 'department', width: '160px', align: 'center' },
    { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
    { id: 'examDate', label: '검사일', field: 'examDate', width: '130px', align: 'center' },
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
      renderCell: (item: EndoscopyRow) => (
        <button type='button' className={styles.viewButton} onClick={() => handleViewResultClick(item)}>
          보기
        </button>
      )
    }
  ], [renderImageButton])

  const renderTabletCard = useCallback(
    (item: EndoscopyRow) => (
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
            <span className={styles.tabletCardLabel}>검사일</span>
            <span className={styles.tabletCardValue}>{item.examDate}</span>
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
            <button type='button' className={styles.viewButton} onClick={() => handleViewResultClick(item)}>
              보기
            </button>
          </div>
        </div>
      </div>
    ),
    [renderImageButton]
  )

  const renderMobileCard = useCallback(
    (item: EndoscopyRow) => (
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
            <span className={styles.mobileCardLabel}>검사일</span>
            <span className={styles.mobileCardValue}>{item.examDate}</span>
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
            <button type='button' className={styles.viewButton} onClick={() => handleViewResultClick(item)}>
              보기
            </button>
          </div>
        </div>
      </div>
    ),
    [renderImageButton]
  )

  if (loading) {
    return <Skeleton width='100%' height={44} variant='rounded' count={5} gap={4} />
  }

  if (filteredSorted.length === 0) {
    return <div className={styles.emptyState}>내시경검사 결과가 없습니다.</div>
  }

  return (
    <>
      <Table
        columns={endoscopyColumns}
        data={pagedRows}
        getRowKey={item => item.id}
        renderTabletCard={renderTabletCard}
        renderMobileCard={renderMobileCard}
      />

      {selectedRow && isResultModalOpen && (
        <PathologyResultModal
          isOpen={isResultModalOpen}
          onClose={handleCloseResultModal}
          examName={selectedRow.examName}
          result={selectedRow._raw.resultContent || selectedRow._raw.grossResult || ''}
          badgeLabel='내시경검사'
        />
      )}

      {selectedRow && isImageModalOpen && (
        <ImageViewerModal
          isOpen={isImageModalOpen}
          onClose={handleCloseImageModal}
          examType='내시경 검사'
          examName={selectedRow.examName}
          images={imageUrls}
        />
      )}
    </>
  )
}
