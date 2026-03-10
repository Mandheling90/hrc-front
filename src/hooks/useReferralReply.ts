import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { EHR_REFERRAL_REPLY_QUERY } from '@/graphql/hospital/queries'

export interface ReferralReplyItem {
  referralDate: string | null
  departmentName: string | null
  doctorName: string | null
  patientName: string | null
  genderCode: string | null
  age: string | null
  frontResidentNo: string | null
  backResidentNo: string | null
  diagnosisCode: string | null
  diagnosisName: string | null
  treatmentPeriod: string | null
  visitTypeCode: string | null
  opinion: string | null
  replyDate: string | null
  phoneNo: string | null
}

interface ReferralReplyResult {
  item: ReferralReplyItem | null
}

interface ReferralReplyQueryInput {
  hospitalCode: string
  ptno: string
  refrSno: string
  refrYmd: string
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
    replyItem: data?.ehrGetReferralReply?.item ?? null,
    loading,
    error
  }
}
