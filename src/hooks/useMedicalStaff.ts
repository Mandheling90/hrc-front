import { useCallback } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client/react'
import { MEDICAL_STAFF_LIST_QUERY } from '@/graphql/hospital/queries'
import {
  MEDICAL_STAFF_DEPARTMENT_LIST_QUERY,
  MEDICAL_STAFF_WEEKLY_SCHEDULE_QUERY
} from '@/graphql/hospital/medical-staff-queries'

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

export interface DepartmentItem {
  departmentCode: string
  departmentName: string
}

export interface WeeklyScheduleItem {
  doctorId: string
  doctorName: string
  departmentCode: string
  departmentName: string
  apntPsblYn: string | null
  monAmpmCd: string | null
  tueAmpmCd: string | null
  wedAmpmCd: string | null
  thuAmpmCd: string | null
  friAmpmCd: string | null
  hospitalCode: string
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

interface DepartmentListResult {
  items: DepartmentItem[]
  totalCount: number
}

interface WeeklyScheduleResult {
  items: WeeklyScheduleItem[]
  totalCount: number
}

export function useMedicalStaff() {
  // 진료과 목록 (자동 조회)
  const { data: deptData, loading: deptLoading } = useQuery<{
    medicalStaffDepartmentList: DepartmentListResult
  }>(MEDICAL_STAFF_DEPARTMENT_LIST_QUERY, { fetchPolicy: 'cache-first' })

  // 의료진 목록 (수동 조회)
  const [query, { data, loading, error }] = useLazyQuery<{
    medicalStaffList: MedicalStaffListResult
  }>(MEDICAL_STAFF_LIST_QUERY, { fetchPolicy: 'cache-first' })

  // 주간 스케줄 (수동 조회)
  const [scheduleQuery, { data: scheduleData, loading: scheduleLoading }] = useLazyQuery<{
    medicalStaffWeeklySchedule: WeeklyScheduleResult
  }>(MEDICAL_STAFF_WEEKLY_SCHEDULE_QUERY, { fetchPolicy: 'cache-and-network' })

  const fetchMedicalStaff = useCallback(async (filter?: MedicalStaffFilterInput) => {
    const result = await query({ variables: { filter } })
    return result.data?.medicalStaffList ?? null
  }, [query])

  const fetchWeeklySchedule = useCallback(async (mcdpCd: string, mdcrYmd: string) => {
    const result = await scheduleQuery({ variables: { mcdpCd, mdcrYmd } })
    return result.data?.medicalStaffWeeklySchedule ?? null
  }, [scheduleQuery])

  return {
    // 진료과 목록
    departmentList: deptData?.medicalStaffDepartmentList?.items ?? [],
    deptLoading,
    // 의료진 목록
    fetchMedicalStaff,
    staffList: data?.medicalStaffList?.items ?? [],
    totalCount: data?.medicalStaffList?.totalCount ?? 0,
    loading,
    error,
    // 주간 스케줄
    fetchWeeklySchedule,
    scheduleList: scheduleData?.medicalStaffWeeklySchedule?.items ?? [],
    scheduleLoading
  }
}
