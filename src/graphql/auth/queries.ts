import { gql } from '@apollo/client'

export const CHECK_USER_ID_QUERY = gql`
  query CheckUserIdAvailable($userId: String!) {
    checkUserIdAvailable(userId: $userId) {
      available
      existsInDb
      existsInEhr
    }
  }
`

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

export const ME_QUERY = gql`
  query Me {
    me {
      id
      userId
      email
      userName
      userType
      hospitalCode
      phone
      status
      mustChangePw
      profile {
        birthDate
        department
        gender
        hospAddress
        hospCode
        hospName
        licenseNo
        representative
        specialty
      }
      createdAt
      updatedAt
    }
  }
`
