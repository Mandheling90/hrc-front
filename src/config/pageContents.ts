import { HospitalId, HospitalPageContent } from '@/types/hospital'
import { getCurrentHospitalId } from './hospitals'

// 안암병원 페이지 콘텐츠
const anamContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
      '의뢰하신 환자의 진료정보를 확인할 수 있는 시스템입니다.'
    ],
    services: [
      {
        id: 'referral',
        icon: 'ReferralIcon',
        title: '진료의뢰',
        description: '진료정보교류와 심평원 중계포털을\n이용한 전자의뢰가 가능합니다.',
        href: '/referral/request'
      },
      {
        id: 'patient-query',
        icon: 'PatientIcon',
        title: '의뢰 환자 조회',
        description: '의뢰해주신 환자의\n진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'consulting',
        icon: 'ConsultingIcon',
        title: 'e-Consulting',
        description: '고려대학교 안암병원 자문의를 통해\n온라인으로 의료상담이 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '#'
      }
    ]
  }
}

// 구로병원 페이지 콘텐츠
const guroContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
      '의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
    ],
    services: [
      {
        id: 'referral',
        icon: 'ReferralIcon',
        title: '진료의뢰',
        description: '진료정보교류와 심평원 중계포털을\n이용한 전자의뢰가 가능합니다.',
        href: '/referral/request'
      },
      {
        id: 'patient-query',
        icon: 'PatientIcon',
        title: '의뢰 환자 조회',
        description: '의뢰해주신 환자의\n진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '#'
      }
    ]
  }
}

// 안산병원 페이지 콘텐츠
const ansanContent: HospitalPageContent = {
  referral: {
    intro: [
      '진료의뢰시스템은 지역병의원과 협력병의원의 의사전용 사이트로,',
      '의뢰하신 환자 및 회송된 환자의 진료정보를 확인할 수 있는 시스템입니다.'
    ],
    services: [
      {
        id: 'referral',
        icon: 'ReferralIcon',
        title: '진료의뢰',
        description: '진료정보교류와 심평원 중계포털을\n이용한 전자의뢰가 가능합니다.',
        href: '/referral/request'
      },
      {
        id: 'patient-query',
        icon: 'PatientIcon',
        title: '의뢰 환자 조회',
        description: '의뢰해주신 환자의\n진료정보 조회가 가능합니다.',
        href: '#'
      },
      {
        id: 'network',
        icon: 'NetworkIcon',
        title: '협력네트워크',
        description: '온라인으로 협력병의원\n체결신청이 가능합니다.',
        href: '#'
      }
    ]
  }
}

// 모든 병원 페이지 콘텐츠 맵
export const hospitalPageContents: Record<HospitalId, HospitalPageContent> = {
  anam: anamContent,
  guro: guroContent,
  ansan: ansanContent
}

// 현재 병원의 페이지 콘텐츠 가져오기
export const getCurrentPageContent = (): HospitalPageContent => {
  const hospitalId = getCurrentHospitalId()
  return hospitalPageContents[hospitalId]
}

// 특정 병원의 페이지 콘텐츠 가져오기
export const getPageContent = (hospitalId: HospitalId): HospitalPageContent => {
  return hospitalPageContents[hospitalId]
}
