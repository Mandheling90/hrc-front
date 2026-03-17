import { gql } from '@apollo/client'

export const CHECK_VERIFICATION_DUPLICATE_QUERY = gql`
  query CheckVerificationDuplicate($verificationToken: String!) {
    checkVerificationDuplicate(verificationToken: $verificationToken) {
      isDuplicate
      message
    }
  }
`
