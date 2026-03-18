import { gql } from '@apollo/client'

export const EHR_REFERRAL_PATIENTS_QUERY = gql`
  query EhrGetReferralPatients($input: ReferralPatientQueryInput!) {
    ehrGetReferralPatients(input: $input) {
      items {
        patientNo
        patientName
        genderCode
        age
        visitDate
        departmentCode
        departmentName
        doctorId
        doctorName
        referralDepartmentCode
        referralDepartmentName
        referralDoctorName
        drugOrderExists
        infoConsentYn
        replyDate
        referralDate
        careInstitutionNo
        hospitalName
        referralSeqNo
        referralStatusCode
        isConsultant
      }
      totalCount
    }
  }
`

export const EHR_REFERRAL_REPLY_QUERY = gql`
  query EhrGetReferralReply($input: ReferralReplyQueryInput!) {
    ehrGetReferralReply(input: $input) {
      item {
        referralDate
        departmentName
        doctorName
        patientName
        genderCode
        age
        frontResidentNo
        backResidentNo
        diagnosisCode
        diagnosisName
        treatmentPeriod
        visitTypeCode
        opinion
        replyDate
        phoneNo
      }
    }
  }
`

export const EHR_VISIT_HISTORY_QUERY = gql`
  query EhrGetVisitHistory($input: VisitHistoryQueryInput!) {
    ehrGetVisitHistory(input: $input) {
      items {
        visitDate
        visitDatetime
        departmentName
        doctorId
        doctorName
        visitTypeCode
        visitTypeName
        admissionDate
        wardCode
        wardName
        roomNo
        diagnosisName
      }
      totalCount
    }
  }
`

export const EHR_EXAM_RESULTS_QUERY = gql`
  query EhrGetExamResultsByDate($input: PatientDateQueryInput!) {
    ehrGetExamResultsByDate(input: $input) {
      items {
        departmentName
        doctorName
        examCode
        examDate
        examRoomCode
        examRoomName
        normalLowerLimit
        normalUpperLimit
        orderName
        resultContent
        resultFormatCode
        resultRemark
        resultUnit
      }
      totalCount
    }
  }
`

export const EHR_EXAM_SLIPS_QUERY = gql`
  query EhrGetExamSlipsByDate($input: ExamSlipQueryInput!) {
    ehrGetExamSlipsByDate(input: $input) {
      items {
        departmentCode
        departmentName
        doctorId
        doctorName
        enforceDate
        enforceDatetime
        examCode
        orderName
        slipCode
        slipName
        treatmentDate
      }
      totalCount
    }
  }
`

export const EHR_SPECIAL_EXAM_RESULTS_QUERY = gql`
  query EhrGetSpecialExamResults($input: ExamSlipQueryInput!) {
    ehrGetSpecialExamResults(input: $input) {
      items {
        departmentName
        doctorName
        examDate
        grossResult
        orderCode
        orderDate
        orderName
        pacsAccessNo
        readerId1
        readerId2
        readerId3
        resultContent
        sortOrder
        specimenCode
        specimenNo
      }
      totalCount
    }
  }
`

export const EHR_DRUG_ORDERS_QUERY = gql`
  query EhrGetDrugOrders($input: DrugOrderQueryInput!) {
    ehrGetDrugOrders(input: $input) {
      items {
        orderCode
        orderName
        orderDate
        dose
        totalAmount
        unit
        count
        useDay
        type
        methodWhen
        methodHow
        departmentName
        doctorName
        dosage
        doseUnit
        frequency
        days
        usage
        visitDate
      }
      totalCount
    }
  }
`

export const EHR_DRUG_ORDER_DETAIL_QUERY = gql`
  query EhrGetDrugOrderDetail($input: DrugOrderDetailQueryInput!) {
    ehrGetDrugOrderDetail(input: $input) {
      item {
        drugCode
        drugName
        prodName
        ingredient
        drugType
        drugTypeName
        unit
        manufacturer
        description
      }
    }
  }
`

export const IMAGING_REQUEST_OVERLAY_QUERY = gql`
  query ImagingRequestOverlay($ptntNo: String!, $examDate: String!, $orderCode: String!, $pacsAccessNo: String) {
    imagingRequestOverlay(ptntNo: $ptntNo, examDate: $examDate, orderCode: $orderCode, pacsAccessNo: $pacsAccessNo) {
      id
      displayState
      status
      requestedAt
      expiresAt
      attachments {
        id
        originalName
        mimeType
        fileSize
        storedPath
        createdAt
      }
    }
  }
`

export const MEDICAL_STAFF_LIST_QUERY = gql`
  query MedicalStaffList($filter: AdmapMedicalStaffFilterInput) {
    medicalStaffList(filter: $filter) {
      items {
        doctorId
        doctorName
        photoUrl
        departmentCode
        departmentName
        bio
        hospitalCode
        mcdpAbrvCd
        mcdpDvsnCd
        mcdpSqncVl
        apstYmd
        apfnYmd
        smcrYn
        frvsMdcrPsblYn
        revsMdcrPsblYn
        fastMdcrDt
        specialty
        drNo
      }
      totalCount
    }
  }
`

export const EHR_HOSPITAL_SEARCH_QUERY = gql`
  query EhrGetCollaboratingHospitals($input: SearchCollaboratingHospitalsInput!) {
    ehrGetCollaboratingHospitals(input: $input) {
      totalCount
      hospitals {
        id
        name
        address
        addressDetail
        phisCode
        classificationCode
        phone
        faxNumber
        representative
        website
        zipCode
      }
    }
  }
`
