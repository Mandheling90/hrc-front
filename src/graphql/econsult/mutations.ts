import { gql } from '@apollo/client'

export const CREATE_ECONSULT_MUTATION = gql`
  mutation CreateEConsult($input: CreateEConsultInput!) {
    createEConsult(input: $input) {
      id
      hospitalCode
      requesterId
      consultantId
      title
      content
      status
      expiresAt
      createdAt
    }
  }
`
