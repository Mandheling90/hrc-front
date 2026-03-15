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

export const MY_PROFILE_QUERY = gql`
  query MyProfile {
    myProfile {
      id
      userId
      userName
      email
      phone
      userType
      status
      hospitalCode
      profile {
        birthDate
        gender
        doctorType
        licenseNo
        isDirector
        school
        specialty
        department
        smsConsent
        emailConsent
        replyConsent
        hospName
        careInstitutionNo
        hospZipCode
        hospAddress
        hospAddressDetail
        hospPhone
        hospWebsite
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
      hospitalId
      phone
      status
      mustChangePw
      profile {
        birthDate
        department
        gender
        hospAddress
        hospAddressDetail
        hospCode
        hospName
        hospPhone
        hospWebsite
        hospZipCode
        careInstitutionNo
        licenseNo
        representative
        school
        smsConsent
        emailConsent
        replyConsent
        specialty
      }
      createdAt
      updatedAt
    }
  }
`
