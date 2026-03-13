import { useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { MEDICAL_STAFF_LIST_QUERY } from '@/graphql/hospital/queries'

export interface MedicalStaffItem {
  doctorId: string
  doctorName: string
  photoUrl: string | null
  departmentCode: string
  departmentName: string
  bio: string | null
  hospitalCode: string
  mcdpAbrvCd: string | null
  mcdpDvsnCd: string | null
  mcdpSqncVl: string | null
  apstYmd: string | null
  apfnYmd: string | null
  smcrYn: string | null
  frvsMdcrPsblYn: string | null
  revsMdcrPsblYn: string | null
  fastMdcrDt: string | null
}

interface MedicalStaffFilterInput {
  mcdpCd?: string
  mddrId?: string
  mddrNm?: string
}

interface MedicalStaffListResult {
  items: MedicalStaffItem[]
  totalCount: number
}

export function useMedicalStaff() {
  const [query, { data, loading, error }] = useLazyQuery<{
    medicalStaffList: MedicalStaffListResult
  }>(MEDICAL_STAFF_LIST_QUERY, { fetchPolicy: 'cache-first' })

  const fetchMedicalStaff = useCallback(async (filter?: MedicalStaffFilterInput) => {
    const result = await query({ variables: { filter } })
    return result.data?.medicalStaffList ?? null
  }, [query])

  return {
    fetchMedicalStaff,
    staffList: data?.medicalStaffList?.items ?? [],
    totalCount: data?.medicalStaffList?.totalCount ?? 0,
    loading,
    error
  }
}
