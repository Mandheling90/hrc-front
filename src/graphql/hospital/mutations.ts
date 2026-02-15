import { gql } from '@apollo/client'

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
