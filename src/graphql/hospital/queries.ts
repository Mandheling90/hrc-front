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

export const EHR_HOSPITAL_SEARCH_QUERY = gql`
  query EhrGetCollaboratingHospitals($input: SearchCollaboratingHospitalsInput!) {
    ehrGetCollaboratingHospitals(input: $input) {
      totalCount
      hospitals {
        name
        address
        addressDetail
        phisCode
        classificationCode
        phone
        representative
        website
        zipCode
      }
    }
  }
`
