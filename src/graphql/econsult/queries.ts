import { gql } from '@apollo/client'

export const ECONSULT_CONSULTANTS_QUERY = gql`
  query adminEconsultConsultants($hospitalCode: HospitalCode) {
    adminEconsultConsultants(hospitalCode: $hospitalCode) {
      id
      doctorId
      name
      departmentCode
      departmentName
      specialty
      hospitalCode
      email
      phone
      photoUrl
      isActive
      createdAt
      updatedAt
    }
  }
`

export const CONSULTANT_DOCTORS_QUERY = gql`
  query ConsultantDoctors($departmentCode: String, $search: String, $specialty: String) {
    consultantDoctors(departmentCode: $departmentCode, search: $search, specialty: $specialty) {
      id
      doctorId
      name
      department
      specialty
      hospitalCode
      email
      phone
      photoUrl
      isActive
      sortOrder
      licenseNo
      drNo
    }
  }
`

export const MY_ECONSULTS_QUERY = gql`
  query MyEConsults($filter: EConsultFilterInput, $pagination: PaginationInput) {
    myEConsults(filter: $filter, pagination: $pagination) {
      items {
        id
        hospitalCode
        requesterId
        requester {
          userName
          email
          profile {
            hospName
          }
        }
        consultantId
        consultant {
          name
          department
        }
        title
        content
        status
        answeredAt
        expiresAt
        createdAt
      }
      totalCount
      hasNextPage
    }
  }
`

export const CONSULTANT_ASSIGNED_ECONSULTS_QUERY = gql`
  query ConsultantAssignedEConsults(
    $filter: EConsultFilterInput
    $pagination: PaginationInput
  ) {
    consultantAssignedEConsults(
      filter: $filter
      pagination: $pagination
    ) {
      items {
        id
        title
        status
        createdAt
        answeredAt
        requester {
          id
          userName
          email
          phone
          profile {
            hospName
          }
        }
        consultant {
          id
          name
          department
          specialty
          email
        }
      }
      totalCount
      hasNextPage
    }
  }
`

export const CONSULTANT_ECONSULT_BY_ID_QUERY = gql`
  query ConsultantEConsultById($id: String!) {
    consultantEConsultById(id: $id) {
      id
      title
      content
      status
      createdAt
      answeredAt
      expiresAt
      requester {
        id
        userName
        email
        phone
        profile {
          hospName
        }
      }
      consultant {
        id
        name
        department
        specialty
        email
      }
      reply {
        id
        content
        createdAt
        repliedById
        repliedBy {
          id
          userName
        }
      }
    }
  }
`

export const MY_ASSIGNED_ECONSULTS_QUERY = gql`
  query MyAssignedEConsults(
    $consultantDoctorId: String!
    $filter: EConsultFilterInput
    $pagination: PaginationInput
  ) {
    myAssignedEConsults(
      consultantDoctorId: $consultantDoctorId
      filter: $filter
      pagination: $pagination
    ) {
      items {
        id
      }
      totalCount
      hasNextPage
    }
  }
`

export const ECONSULT_BY_ID_QUERY = gql`
  query EConsultById($id: String!) {
    eConsultById(id: $id) {
      id
      hospitalCode
      requesterId
      requester {
        userName
        email
        profile {
          hospName
        }
      }
      consultantId
      consultant {
        name
        department
        email
      }
      title
      content
      status
      reply {
        id
        content
        repliedById
        repliedBy {
          userName
        }
        createdAt
      }
      answeredAt
      expiresAt
      createdAt
    }
  }
`
