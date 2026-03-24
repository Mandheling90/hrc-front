'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import {
  MedicationDetailModal,
  MedicationDetailData
} from '@/components/organisms/MedicationDetailModal/MedicationDetailModal'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import { useDrugOrders, useDrugOrderDetail, type DrugOrderItem } from '@/hooks/useExamResults'
import { matchesKeyword, matchesDateRange, sortByDate, paginate, formatDateDisplay, type FilterSortProps } from '../../utils/filterSort'
import styles from '../../page.module.scss'

export interface PrescriptionTabProps extends FilterSortProps {
  hospitalCode: string
  ptntNo: string
  mcdpCd: string
}

interface PrescriptionRow {
  id: string
  prescriptionDate: string
  department: string
  doctor: string
  drugName: string
  singleDose: string
  unit: string
  dailyFrequency: string
  days: string
  category: string
  methodWhen: string
  methodHow: string
  _raw: DrugOrderItem
}

function toRow(item: DrugOrderItem, index: number): PrescriptionRow {
  return {
    id: `${item.orderCode}-${index}`,
    prescriptionDate: formatDateDisplay(item.visitDate ?? item.orderDate),
    department: item.departmentName ?? '-',
    doctor: item.doctorName ?? '-',
    drugName: item.orderName ?? '-',
    singleDose: item.dosage ?? item.dose ?? '-',
    unit: item.doseUnit ?? item.unit ?? '-',
    dailyFrequency: item.frequency ?? item.count ?? '-',
    days: item.days ?? item.useDay ?? '-',
    category: item.usage ?? item.type ?? '-',
    methodWhen: item.methodWhen ?? '-',
    methodHow: item.methodHow ?? '-',
    _raw: item
  }
}

const FIELD_MAP = {
  department: 'department' as const,
  doctor: 'doctor' as const,
  diagnosis: 'drugName' as const
}

export const PrescriptionTab: React.FC<PrescriptionTabProps> = ({
  hospitalCode, ptntNo, mcdpCd,
  sortOrder, searchFilter, currentPage, pageSize, onTotalCountChange
}) => {
  const { searchDrugOrders, items, loading } = useDrugOrders()
  const { searchDrugOrderDetail } = useDrugOrderDetail()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDrug, setSelectedDrug] = useState<MedicationDetailData | null>(null)

  useEffect(() => {
    if (ptntNo && mcdpCd) {
      searchDrugOrders({ hospitalCode, ptntNo, mcdpCd })
    }
  }, [hospitalCode, ptntNo, mcdpCd, searchDrugOrders])

  const allRows = useMemo(() => items.map(toRow), [items])

  const filteredSorted = useMemo(() => {
    let result = allRows.filter(row =>
      matchesKeyword(row, searchFilter, FIELD_MAP) &&
      matchesDateRange(row.prescriptionDate, searchFilter)
    )
    result = sortByDate(result, 'prescriptionDate', sortOrder)
    return result
  }, [allRows, searchFilter, sortOrder])

  useEffect(() => {
    onTotalCountChange(filteredSorted.length)
  }, [filteredSorted.length, onTotalCountChange])

  const pagedRows = useMemo(() => paginate(filteredSorted, currentPage, pageSize), [filteredSorted, currentPage, pageSize])

  const handleDrugNameClick = useCallback(async (item: PrescriptionRow) => {
    const orderCode = item._raw.orderCode
    if (orderCode) {
      const detail = await searchDrugOrderDetail({ hospitalCode, ordrCd: orderCode })
      if (detail) {
        setSelectedDrug({
          drugName: detail.drugName ?? item.drugName,
          koreanName: detail.prodName ?? '-',
          ingredient: detail.ingredient ?? '-',
          type: detail.drugTypeName ?? item.category,
          unit: detail.unit ?? item.unit,
          manufacturer: detail.manufacturer ?? '-',
          detail: detail.description ?? ''
        })
        setIsModalOpen(true)
        return
      }
    }
    setSelectedDrug({
      drugName: item.drugName,
      koreanName: '-',
      ingredient: '-',
      type: item.category,
      unit: item.unit,
      manufacturer: '-',
      detail: ''
    })
    setIsModalOpen(true)
  }, [hospitalCode, searchDrugOrderDetail])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const prescriptionColumns: TableColumn<PrescriptionRow>[] = [
    { id: 'prescriptionDate', label: '처방일', field: 'prescriptionDate', width: '120px', align: 'center' },
    { id: 'department', label: '진료과', field: 'department', width: '130px', align: 'center' },
    { id: 'doctor', label: '진료의', field: 'doctor', width: '100px', align: 'center' },
    {
      id: 'drugName',
      label: '약품명',
      width: '1fr',
      align: 'center',
      renderCell: (item: PrescriptionRow) => (
        <button type='button' className={styles.drugNameLink} onClick={() => handleDrugNameClick(item)}>
          {item.drugName}
        </button>
      )
    },
    { id: 'singleDose', label: '1회 투여량', field: 'singleDose', width: '90px', align: 'center' },
    { id: 'unit', label: '단위', field: 'unit', width: '60px', align: 'center' },
    { id: 'dailyFrequency', label: '1일 회수', field: 'dailyFrequency', width: '70px', align: 'center' },
    { id: 'days', label: '일수', field: 'days', width: '50px', align: 'center' },
    { id: 'category', label: '구분', field: 'category', width: '100px', align: 'center' },
    { id: 'methodWhen', label: '복용시간', field: 'methodWhen', width: '100px', align: 'center' },
    { id: 'methodHow', label: '복용방법', field: 'methodHow', width: '100px', align: 'center' }
  ]

  const renderPrescriptionTabletCard = (item: PrescriptionRow) => (
    <div className={styles.tabletCard}>
      <div className={styles.tabletCardHeader}>
        <span className={styles.tabletCardHeaderLabel}>처방일</span>
        <span className={styles.tabletCardHeaderValue}>{item.prescriptionDate}</span>
      </div>
      <div className={styles.tabletCardBody}>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>진료과</span>
          <span className={styles.tabletCardValue}>{item.department}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>진료의</span>
          <span className={styles.tabletCardValue}>{item.doctor}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>약품명</span>
          <button type='button' className={styles.drugNameLink} onClick={() => handleDrugNameClick(item)}>
            {item.drugName}
          </button>
        </div>
        <div className={styles.tabletCardHorizontalDivider} />
        <div className={styles.tabletCardDoubleRow}>
          <div className={styles.tabletCardDoubleColumn}>
            <span className={styles.tabletCardDoubleLabel}>1회 투여량</span>
            <span className={styles.tabletCardDoubleValue}>{item.singleDose}</span>
          </div>
          <div className={styles.tabletCardDoubleSeparator} />
          <div className={styles.tabletCardDoubleColumn}>
            <span className={styles.tabletCardDoubleLabel}>단위</span>
            <span className={styles.tabletCardDoubleValue}>{item.unit}</span>
          </div>
        </div>
        <div className={styles.tabletCardDoubleRow}>
          <div className={styles.tabletCardDoubleColumn}>
            <span className={styles.tabletCardDoubleLabel}>1일 회수</span>
            <span className={styles.tabletCardDoubleValue}>{item.dailyFrequency}</span>
          </div>
          <div className={styles.tabletCardDoubleSeparator} />
          <div className={styles.tabletCardDoubleColumn}>
            <span className={styles.tabletCardDoubleLabel}>일수</span>
            <span className={styles.tabletCardDoubleValue}>{item.days}</span>
          </div>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>복용시간</span>
          <span className={styles.tabletCardValue}>{item.methodWhen}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>복용방법</span>
          <span className={styles.tabletCardValue}>{item.methodHow}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>구분</span>
          <span className={styles.tabletCardValue}>{item.category}</span>
        </div>
      </div>
    </div>
  )

  const renderPrescriptionMobileCard = (item: PrescriptionRow) => (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardHeader}>
        <span className={styles.mobileCardHeaderLabel}>처방일</span>
        <span className={styles.mobileCardHeaderValue}>{item.prescriptionDate}</span>
      </div>
      <div className={styles.mobileCardBody}>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>진료과</span>
          <span className={styles.mobileCardValue}>{item.department}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>진료의</span>
          <span className={styles.mobileCardValue}>{item.doctor}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>약품명</span>
          <button type='button' className={styles.drugNameLink} onClick={() => handleDrugNameClick(item)}>
            {item.drugName}
          </button>
        </div>
        <div className={styles.mobileCardHorizontalDivider} />
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>1회 투여량</span>
          <span className={styles.mobileCardValue}>{item.singleDose}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>단위</span>
          <span className={styles.mobileCardValue}>{item.unit}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>1일 회수</span>
          <span className={styles.mobileCardValue}>{item.dailyFrequency}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>일수</span>
          <span className={styles.mobileCardValue}>{item.days}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>복용시간</span>
          <span className={styles.mobileCardValue}>{item.methodWhen}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>복용방법</span>
          <span className={styles.mobileCardValue}>{item.methodHow}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>구분</span>
          <span className={styles.mobileCardValue}>{item.category}</span>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return <Skeleton width='100%' height={44} variant='rounded' count={5} gap={4} />
  }

  if (filteredSorted.length === 0) {
    return <div className={styles.emptyState}>약 처방 내역이 없습니다.</div>
  }

  return (
    <>
      <Table
        columns={prescriptionColumns}
        data={pagedRows}
        getRowKey={item => item.id}
        renderTabletCard={renderPrescriptionTabletCard}
        renderMobileCard={renderPrescriptionMobileCard}
      />
      {selectedDrug && <MedicationDetailModal isOpen={isModalOpen} onClose={handleCloseModal} data={selectedDrug} />}
    </>
  )
}
