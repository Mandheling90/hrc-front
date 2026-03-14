import { gql } from '@apollo/client'

export const ECONSULT_CONSULTANTS_QUERY = gql`
  query adminEconsultConsultants($hospitalCode: HospitalCode) {
    adminEconsultConsultants(hospitalCode: $hospitalCode) {
      id
      doctorId
      name
      departmentCode
      departmentName
      specialty
      hospitalCode
      email
      phone
      photoUrl
      isActive
      createdAt
      updatedAt
    }
  }
`
