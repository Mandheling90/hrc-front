import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { EHR_VISIT_HISTORY_QUERY } from '@/graphql/hospital/queries'

export interface VisitHistoryItem {
  visitDate: string | null
  visitDatetime: string | null
  departmentName: string | null
  doctorId: string | null
  doctorName: string | null
  visitTypeCode: string | null
  visitTypeName: string | null
  admissionDate: string | null
  wardCode: string | null
  wardName: string | null
  roomNo: string | null
  diagnosisName: string | null
}

interface VisitHistoryResult {
  items: VisitHistoryItem[]
  totalCount: number
}

export interface VisitHistoryQueryInput {
  hospitalCode: string
  ptntNo: string
  mcdpCd?: string
  fromDt?: string
  toDt?: string
}

export function useVisitHistory() {
  const [searchQuery, { data, loading, error }] = useLazyQuery<{
    ehrGetVisitHistory: VisitHistoryResult
  }>(EHR_VISIT_HISTORY_QUERY, { fetchPolicy: 'network-only' })

  const searchVisitHistory = useCallback(
    async (input: VisitHistoryQueryInput) => {
      const result = await searchQuery({ variables: { input } })
      return result.data?.ehrGetVisitHistory ?? null
    },
    [searchQuery]
  )

  return {
    searchVisitHistory,
    items: data?.ehrGetVisitHistory?.items ?? [],
    totalCount: data?.ehrGetVisitHistory?.totalCount ?? 0,
    loading,
    error
  }
}
