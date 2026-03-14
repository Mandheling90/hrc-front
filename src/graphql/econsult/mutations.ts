import { gql } from '@apollo/client'

export const CONSULTANT_REPLY_ECONSULT_MUTATION = gql`
  mutation ConsultantReplyEConsult($doctorId: String!, $id: String!, $input: ReplyEConsultInput!) {
    consultantReplyEConsult(doctorId: $doctorId, id: $id, input: $input) {
      id
      content
      createdAt
      repliedById
    }
  }
`

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
