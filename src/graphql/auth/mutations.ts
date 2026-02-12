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
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`
