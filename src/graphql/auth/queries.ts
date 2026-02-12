import { gql } from '@apollo/client'

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
