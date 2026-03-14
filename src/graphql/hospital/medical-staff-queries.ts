import { gql } from '@apollo/client'

/** 스키마 미반영 API — codegen 대상 제외 */

export const MEDICAL_STAFF_DEPARTMENT_LIST_QUERY = gql`
  query MedicalStaffDepartmentList {
    medicalStaffDepartmentList {
      items {
        departmentCode
        departmentName
      }
      totalCount
    }
  }
`

export const MEDICAL_STAFF_WEEKLY_SCHEDULE_QUERY = gql`
  query MedicalStaffWeeklySchedule($mcdpCd: String!, $mdcrYmd: String!) {
    medicalStaffWeeklySchedule(mcdpCd: $mcdpCd, mdcrYmd: $mdcrYmd) {
      items {
        doctorId
        doctorName
        departmentCode
        departmentName
        apntPsblYn
        monAmpmCd
        tueAmpmCd
        wedAmpmCd
        thuAmpmCd
        friAmpmCd
        hospitalCode
      }
      totalCount
    }
  }
`
