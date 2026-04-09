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
        graduationYear
        trainingHospital
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
      email
      userName
      phone
      profile {
        birthDate
        department
        gender
        doctorType
        isDirector
        hospName
        careInstitutionNo
        hospZipCode
        hospAddress
        hospAddressDetail
        hospPhone
        hospWebsite
        hospCode
        licenseNo
        school
        specialty
        graduationYear
        trainingHospital
        smsConsent
        emailConsent
        replyConsent
        representative
      }
    }
  }
`
