import { gql } from '@apollo/client'

const PARTNER_HOSPITAL_FIELDS = gql`
  fragment PartnerHospitalFields on PartnerHospitalModel {
    id
    applicantId
    hospitalCode
    careInstitutionNo
    partnerType
    hospitalName
    hospitalAddress
    hospitalAddressDetail
    hospitalPhone
    hospitalRepresentative
    hospitalSpecialties
    hospitalZipCode
    hospitalFaxNumber
    hospitalWebsite
    institutionType
    status
    isDirector
    directorName
    directorBirthDate
    directorGender
    directorLicenseNo
    directorSchool
    directorGraduationYear
    directorTrainingHospital
    directorDepartment
    directorSubSpecialty
    directorCarNo
    directorPhone
    directorEmail
    directorSmsConsent
    directorEmailConsent
    directorReplyConsent
    staffName
    staffPosition
    staffDeptType
    staffDeptValue
    staffPhone
    staffTel
    staffEmail
    totalBedCount
    activeBedCount
    icuCount
    premiumRoomCount
    multiRoomCount
    erCount
    totalStaffCount
    specialistCount
    nurseCount
    hasIcu
    hasEr
    hasOperatingRoom
    hasPhysicalTherapy
    hasDialysisRoom
    hasHospice
    hasPsychGeneral
    hasPsychClosed
    hasIntegratedNursing
    hasGuardianCare
    hasSharedCare
    isolationRoomCount
    isolationSingleCount
    isolationDoubleCount
    isolationTripleCount
    isolationTypes
    isolationCareType
    isolationRehabType
    isolationWardOperation
    hasRehabPt
    hasRehabOt
    hasRehabSt
    hasRehabSwallow
    hasRehabIsolation
    departmentSpecialists
    availableTreatments
    clinicMedicationType
    clinicHasHemodialysis
    clinicHasPeritoneal
    clinicHasPhototherapy
    clinicHasExcimerLaser
    majorEquipment
    remarks
    attachments
    attachmentRows {
      id
      originalName
      storedPath
      mimeType
      fileSize
      createdAt
    }
    rejectReason
    approvedAt
    createdAt
    updatedAt
  }
`

export const MY_PARTNER_APPLICATION_QUERY = gql`
  ${PARTNER_HOSPITAL_FIELDS}
  query MyPartnerApplication($hospitalCode: HospitalCode!) {
    myPartnerApplication(hospitalCode: $hospitalCode) {
      ...PartnerHospitalFields
    }
  }
`

export const MY_PARTNER_APPLICATIONS_QUERY = gql`
  ${PARTNER_HOSPITAL_FIELDS}
  query MyPartnerApplications($pagination: PaginationInput) {
    myPartnerApplications(pagination: $pagination) {
      items {
        ...PartnerHospitalFields
      }
      totalCount
      hasNextPage
      cursor
    }
  }
`

export const PARTNER_APPLICATION_BY_ID_QUERY = gql`
  ${PARTNER_HOSPITAL_FIELDS}
  query PartnerApplicationById($id: ID!) {
    partnerApplicationById(id: $id) {
      ...PartnerHospitalFields
      reviewedAt
      reviewedById
      terminatedAt
    }
  }
`
