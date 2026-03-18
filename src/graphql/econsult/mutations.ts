import { gql } from '@apollo/client'

export const CONSULTANT_LOGIN_MUTATION = gql`
  mutation ConsultantLogin($input: ConsultantLoginInput!) {
    consultantLogin(input: $input) {
      accessToken
      cccUser {
        userId
        userNm
        hsptCd
        hsptNm
        dprtCd
        dprtNm
        abrvDprtCd
        bsplNm
        ocfmDetlNm
        userLcnsNo
      }
      consultant {
        id
        name
        hospitalCode
        doctorId
        departmentCode
        departmentName
      }
    }
  }
`

export const CONSULTANT_REPLY_ECONSULT_MUTATION = gql`
  mutation ConsultantReplyEConsult($id: String!, $input: ReplyEConsultInput!) {
    consultantReplyEConsult(id: $id, input: $input) {
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
