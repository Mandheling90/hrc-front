import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { EHR_REFERRAL_REPLY_QUERY } from '@/graphql/hospital/queries'

export interface ReferralReplyItem {
  patientNo: string | null
  patientName: string | null
  departmentName: string | null
  doctorName: string | null
  diagnosisName: string | null
  replyContent: string | null
  replyDate: string | null
  replyDepartmentName: string | null
  replyDoctorName: string | null
  visitDate: string | null
}

interface ReferralReplyResult {
  items: ReferralReplyItem[]
  totalCount: number
}

interface ReferralReplyQueryInput {
  hospitalCode: string
  mcdpCd: string
  mdcrYmd: string
  mddrId: string
  ptntNo: string
}

export function useReferralReply() {
  const [searchQuery, { data, loading, error }] = useLazyQuery<{
    ehrGetReferralReply: ReferralReplyResult
  }>(EHR_REFERRAL_REPLY_QUERY, { fetchPolicy: 'network-only' })

  const fetchReferralReply = useCallback(async (input: ReferralReplyQueryInput) => {
    const result = await searchQuery({ variables: { input } })
    return result.data?.ehrGetReferralReply ?? null
  }, [searchQuery])

  return {
    fetchReferralReply,
    replyItems: data?.ehrGetReferralReply?.items ?? [],
    totalCount: data?.ehrGetReferralReply?.totalCount ?? 0,
    loading,
    error
  }
}
