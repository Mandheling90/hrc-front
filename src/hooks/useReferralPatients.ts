import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { EHR_REFERRAL_PATIENTS_QUERY } from '@/graphql/hospital/queries'

export interface ReferralPatientItem {
  patientNo: string
  patientName: string
  genderCode: string
  age: number
  visitDate: string
  departmentCode: string
  departmentName: string
  doctorId: string
  doctorName: string
  referralDepartmentCode: string
  referralDepartmentName: string
  referralDoctorName: string
  drugOrderExists: string | boolean | null
  infoConsentYn: string
  replyDate: string | null
  referralDate: string
  careInstitutionNo: string
  hospitalName: string
  referralSeqNo: string | null
  referralStatusCode: string | null
}

interface ReferralPatientsResult {
  items: ReferralPatientItem[]
  totalCount: number
}

interface ReferralPatientQueryInput {
  hospitalCode: string
}

export function useReferralPatients() {
  const [searchQuery, { data, loading, error }] = useLazyQuery<{
    ehrGetReferralPatients: ReferralPatientsResult
  }>(EHR_REFERRAL_PATIENTS_QUERY, { fetchPolicy: 'network-only' })

  const searchReferralPatients = useCallback(async (input: ReferralPatientQueryInput) => {
    const result = await searchQuery({ variables: { input } })
    return result.data?.ehrGetReferralPatients ?? null
  }, [searchQuery])

  return {
    searchReferralPatients,
    patients: data?.ehrGetReferralPatients?.items ?? [],
    totalCount: data?.ehrGetReferralPatients?.totalCount ?? 0,
    loading,
    error
  }
}
