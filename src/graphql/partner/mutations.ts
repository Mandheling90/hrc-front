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

export const SAVE_DRAFT_PARTNER_APPLICATION_MUTATION = gql`
  mutation SaveDraftPartnerApplication($input: SaveDraftPartnerInput!) {
    saveDraftPartnerApplication(input: $input) {
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

export const SUBMIT_PARTNER_APPLICATION_MUTATION = gql`
  mutation SubmitPartnerApplication($id: ID!) {
    submitPartnerApplication(id: $id) {
      id
      status
      hospitalCode
      careInstitutionNo
      partnerType
      hospitalName
      institutionType
      createdAt
      updatedAt
    }
  }
`

export const CANCEL_PARTNER_APPLICATION_MUTATION = gql`
  mutation CancelPartnerApplication($id: ID!) {
    cancelPartnerApplication(id: $id)
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
