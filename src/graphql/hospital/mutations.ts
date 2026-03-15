import { gql } from '@apollo/client'

export const REQUEST_IMAGING_EXAM_MUTATION = gql`
  mutation RequestImagingExam($input: CreateImagingRequestInput!) {
    requestImagingExam(input: $input) {
      id
      status
      displayState
      requestedAt
      expiresAt
      attachments {
        id
        originalName
        mimeType
        fileSize
        storedPath
        createdAt
      }
    }
  }
`

export const REGISTER_HOSPITAL_MUTATION = gql`
  mutation RegisterHospital($input: RegisterHospitalInput!) {
    registerHospital(input: $input) {
      id
      name
      representative
      phisCode
      address
      addressDetail
      phone
      zipCode
      website
      classificationCode
    }
  }
`
