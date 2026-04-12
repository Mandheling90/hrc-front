import { gql } from '@apollo/client'

export const APPLY_PARTNER_HOSPITAL_MUTATION = gql`
  mutation ApplyPartnerHospital($input: ApplyPartnerHospitalInput!) {
    applyPartnerHospital(input: $input) {
      id
      applicantId
      hospitalCode
      careInstitutionNo
      partnerType
      hospitalName
      hospitalAddress
      hospitalAddressDetail
      hospitalPhone
      hospitalRepresentative
      hospitalZipCode
      hospitalFaxNumber
      hospitalWebsite
      institutionType
      status
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_PARTNER_APPLICATION_MUTATION = gql`
  mutation UpdatePartnerApplication($input: UpdatePartnerApplicationInput!) {
    updatePartnerApplication(input: $input) {
      id
      status
      hospitalCode
      careInstitutionNo
      partnerType
      hospitalName
      hospitalAddress
      hospitalAddressDetail
      hospitalPhone
      hospitalRepresentative
      hospitalZipCode
      hospitalFaxNumber
      hospitalWebsite
      institutionType
      directorName
      directorPhone
      directorEmail
      staffName
      staffPhone
      staffEmail
      remarks
      createdAt
      updatedAt
    }
  }
`
