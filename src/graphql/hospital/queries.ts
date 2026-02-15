import { gql } from '@apollo/client'

export const EHR_HOSPITAL_SEARCH_QUERY = gql`
  query EhrGetCollaboratingHospitals($input: SearchCollaboratingHospitalsInput!) {
    ehrGetCollaboratingHospitals(input: $input) {
      totalCount
      hospitals {
        name
        address
        addressDetail
        phisCode
        classificationCode
        phone
        representative
        website
        zipCode
      }
    }
  }
`
