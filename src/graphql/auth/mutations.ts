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
          doctorType
          isDirector
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

export const SEND_TEST_EMAIL_MUTATION = gql`
  mutation SendTestEmail($to: String!, $subject: String!, $body: String!, $hospitalCode: HospitalCode) {
    sendTestEmail(to: $to, subject: $subject, body: $body, hospitalCode: $hospitalCode) {
      success
      status
      errorMessage
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

export const UPDATE_DOCTOR_PROFILE_MUTATION = gql`
  mutation UpdateDoctorProfile($input: UpdateDoctorProfileInput!) {
    updateDoctorProfile(input: $input) {
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

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`

export const WITHDRAW_MEMBER_MUTATION = gql`
  mutation WithdrawMember($input: WithdrawMemberInput!) {
    withdrawMember(input: $input) {
      success
      message
    }
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
        phone
        status
        mustChangePw
        profile {
          birthDate
          department
          gender
          doctorType
          isDirector
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
