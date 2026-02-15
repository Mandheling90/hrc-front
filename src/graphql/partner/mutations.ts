import { gql } from '@apollo/client'

export const APPLY_PARTNER_HOSPITAL_MUTATION = gql`
  mutation ApplyPartnerHospital($input: ApplyPartnerHospitalInput!) {
    applyPartnerHospital(input: $input) {
      id
      applicantId
      hospitalCode
      hospitalId
      institutionType
      status
      hospital {
        id
        name
        address
        addressDetail
        phone
        zipCode
        phisCode
      }
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
      hospitalId
      institutionType
      status
      hospital {
        id
        name
        address
        addressDetail
        phone
        zipCode
        phisCode
      }
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
      hospitalId
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
