import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import {
  EHR_EXAM_RESULTS_QUERY,
  EHR_EXAM_SLIPS_QUERY,
  EHR_SPECIAL_EXAM_RESULTS_QUERY,
  EHR_DRUG_ORDERS_QUERY
} from '@/graphql/hospital/queries'

// ── 진단검사 결과 ──

export interface ExamResultItem {
  departmentName: string | null
  doctorName: string | null
  examCode: string | null
  examDate: string | null
  examRoomCode: string | null
  examRoomName: string | null
  normalLowerLimit: string | null
  normalUpperLimit: string | null
  orderName: string | null
  resultContent: string | null
  resultFormatCode: string | null
  resultRemark: string | null
  resultUnit: string | null
}

export interface PatientDateQueryInput {
  hospitalCode: string
  ptntNo: string
  date: string
  slipCd?: string
}

export function useExamResults() {
  const [query, { data, loading, error }] = useLazyQuery<{
    ehrGetExamResultsByDate: { items: ExamResultItem[]; totalCount: number }
  }>(EHR_EXAM_RESULTS_QUERY, { fetchPolicy: 'network-only' })

  const searchExamResults = useCallback(
    async (input: PatientDateQueryInput) => {
      const result = await query({ variables: { input } })
      return result.data?.ehrGetExamResultsByDate ?? null
    },
    [query]
  )

  return {
    searchExamResults,
    items: data?.ehrGetExamResultsByDate?.items ?? [],
    totalCount: data?.ehrGetExamResultsByDate?.totalCount ?? 0,
    loading,
    error
  }
}

// ── 검사 SLIP (병리/영상/내시경/기타) ──

export interface ExamSlipItem {
  departmentCode: string | null
  departmentName: string | null
  doctorId: string | null
  doctorName: string | null
  enforceDate: string | null
  enforceDatetime: string | null
  examCode: string | null
  orderName: string | null
  slipCode: string | null
  slipName: string | null
  treatmentDate: string | null
}

export interface ExamSlipQueryInput {
  hospitalCode: string
  ptntNo: string
  slipCd: string
  mcdpCd?: string
}

export function useExamSlips() {
  const [query, { data, loading, error }] = useLazyQuery<{
    ehrGetExamSlipsByDate: { items: ExamSlipItem[]; totalCount: number }
  }>(EHR_EXAM_SLIPS_QUERY, { fetchPolicy: 'network-only' })

  const searchExamSlips = useCallback(
    async (input: ExamSlipQueryInput) => {
      const result = await query({ variables: { input } })
      return result.data?.ehrGetExamSlipsByDate ?? null
    },
    [query]
  )

  return {
    searchExamSlips,
    items: data?.ehrGetExamSlipsByDate?.items ?? [],
    totalCount: data?.ehrGetExamSlipsByDate?.totalCount ?? 0,
    loading,
    error
  }
}

// ── 특수검사 결과 (영상/내시경/기타 판독결과) ──

export interface SpecialExamResultItem {
  departmentName: string | null
  doctorName: string | null
  examDate: string | null
  grossResult: string | null
  orderCode: string | null
  orderDate: string | null
  orderName: string | null
  pacsAccessNo: string | null
  readerId1: string | null
  readerId2: string | null
  readerId3: string | null
  resultContent: string | null
  sortOrder: string | null
  specimenCode: string | null
  specimenNo: string | null
}

export function useSpecialExamResults() {
  const [query, { data, loading, error }] = useLazyQuery<{
    ehrGetSpecialExamResults: { items: SpecialExamResultItem[]; totalCount: number }
  }>(EHR_SPECIAL_EXAM_RESULTS_QUERY, { fetchPolicy: 'network-only' })

  const searchSpecialExamResults = useCallback(
    async (input: ExamSlipQueryInput) => {
      const result = await query({ variables: { input } })
      return result.data?.ehrGetSpecialExamResults ?? null
    },
    [query]
  )

  return {
    searchSpecialExamResults,
    items: data?.ehrGetSpecialExamResults?.items ?? [],
    totalCount: data?.ehrGetSpecialExamResults?.totalCount ?? 0,
    loading,
    error
  }
}

// ── 약 처방 내역 ──

export interface DrugOrderItem {
  days: string | null
  dosage: string | null
  doseUnit: string | null
  frequency: string | null
  orderCode: string | null
  orderName: string | null
  usage: string | null
  visitDate: string | null
}

export interface DrugOrderQueryInput {
  hospitalCode: string
  ptntNo: string
  mdcrDt: string
}

export function useDrugOrders() {
  const [query, { data, loading, error }] = useLazyQuery<{
    ehrGetDrugOrders: { items: DrugOrderItem[]; totalCount: number }
  }>(EHR_DRUG_ORDERS_QUERY, { fetchPolicy: 'network-only' })

  const searchDrugOrders = useCallback(
    async (input: DrugOrderQueryInput) => {
      const result = await query({ variables: { input } })
      return result.data?.ehrGetDrugOrders ?? null
    },
    [query]
  )

  return {
    searchDrugOrders,
    items: data?.ehrGetDrugOrders?.items ?? [],
    totalCount: data?.ehrGetDrugOrders?.totalCount ?? 0,
    loading,
    error
  }
}
