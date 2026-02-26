import { gql } from '@apollo/client'

export const INITIATE_VERIFICATION_MUTATION = gql`
  mutation InitiateVerification($input: InitiateVerificationInput!) {
    initiateVerification(input: $input) {
      authUrl
      sessionId
    }
  }
`

export const COMPLETE_VERIFICATION_MUTATION = gql`
  mutation CompleteVerification($input: CompleteVerificationInput!) {
    completeVerification(input: $input) {
      authMethod
      birthDate
      ci
      di
      gender
      name
      nationalInfo
      phone
      verificationToken
    }
  }
`

export const FIND_USER_ID_BY_VERIFICATION_MUTATION = gql`
  mutation FindUserIdByVerification($input: FindUserIdByVerificationInput!) {
    findUserIdByVerification(input: $input) {
      userId
      message
    }
  }
`

export const RESET_PASSWORD_BY_VERIFICATION_MUTATION = gql`
  mutation ResetPasswordByVerification($input: ResetPasswordByVerificationInput!) {
    resetPasswordByVerification(input: $input) {
      message
    }
  }
`
