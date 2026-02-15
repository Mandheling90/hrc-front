import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      mustChangePw
      user {
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
      }
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      refreshToken
      mustChangePw
      user {
        id
        userId
        email
        userName
        userType
        hospitalCode
        phone
        status
        mustChangePw
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      mustChangePw
      user {
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
      }
    }
  }
`
